"use strict";

const { MoleculerClientError } = require("moleculer").Errors;
const { ForbiddenError } = require("moleculer-web").Errors;

const _ = require("lodash");
const slug = require("slug");
const DbService = require("../mixins/db.mixin");
const CacheCleanerMixin = require("../mixins/cache.cleaner.mixin");

module.exports = {
	name: "adventures",
	mixins: [
		DbService("adventures"),
		CacheCleanerMixin([
			"cache.clean.adventures",
			"cache.clean.users",
			"cache.clean.comments",
			"cache.clean.follows",
			"cache.clean.favorites",
		])
	],

	/**
	 * Default settings
	 */
	settings: {
		fields: ["_id", "title", "slug", "description", "body", "tagList", "createdAt", "updatedAt", "favorited", "favoritesCount", "author", "comments"],

		// Populates
		populates: {
			author: {
				action: "users.get",
				params: {
					fields: ["username", "bio", "image"]
				}
			},
			comments: {
				action: "comments.get",
				params: {
					fields: ["_id", "body", "author"],
					populates: ["author"]
				}
			},
			favorited(ids, adventures, rule, ctx) {
				if (ctx.meta.user)
					return this.Promise.all(adventures.map(adventure => ctx.call("favorites.has", { adventure: adventure._id.toString(), user: ctx.meta.user._id.toString() }).then(res => adventure.favorited = res)));
				else {
					adventures.forEach(adventure => adventure.favorited = false);
					return this.Promise.resolve();
				}
			},
			favoritesCount(ids, adventures, rule, ctx) {
				return this.Promise.all(adventures.map(adventure => ctx.call("favorites.count", { adventure: adventure._id.toString() }).then(count => adventure.favoritesCount = count)));
			}
		},

		// Validation schema for new entities
		entityValidator: {
			title: { type: "string", min: 1 },
			description: { type: "string", min: 1 },
			body: { type: "string", min: 1 },
			tagList: { type: "array", items: "string", optional: true },
		}
	},

	/**
	 * Actions
	 */
	actions: {

		/**
		 * Create a new adventure.
		 * Auth is required!
		 *
		 * @actions
		 * @param {Object} adventure - Adventure entity
		 *
		 * @returns {Object} Created entity
		 */
		create: {
			auth: "required",
			params: {
				adventure: { type: "object" }
			},
			handler(ctx) {
				let entity = ctx.params.adventure;
				return this.validateEntity(entity)
					.then(() => {

						entity.slug = slug(entity.title, { lower: true }) + "-" + (Math.random() * Math.pow(36, 6) | 0).toString(36);
						entity.author = ctx.meta.user._id.toString();
						entity.createdAt = new Date();
						entity.updatedAt = new Date();

						return this.adapter.insert(entity)
							.then(doc => this.transformDocuments(ctx, { populate: ["author", "favorited", "favoritesCount"]}, doc))
							.then(entity => this.transformResult(ctx, entity, ctx.meta.user))
							.then(json => this.entityChanged("created", json, ctx).then(() => json));
					});
			}
		},

		/**
		 * Update an adventure.
		 * Auth is required!
		 *
		 * @actions
		 * @param {String} id - Adventure ID
		 * @param {Object} adventure - Adventure modified fields
		 *
		 * @returns {Object} Updated entity
		 */
		update: {
			auth: "required",
			params: {
				id: { type: "string" },
				adventure: { type: "object", props: {
					title: { type: "string", min: 1, optional: true },
					description: { type: "string", min: 1, optional: true },
					body: { type: "string", min: 1, optional: true },
					tagList: { type: "array", items: "string", optional: true },
				} }
			},
			handler(ctx) {
				let newData = ctx.params.adventure;
				newData.updatedAt = new Date();
				// the 'id' is the slug
				return this.Promise.resolve(ctx.params.id)
					.then(slug => this.findBySlug(slug))
					.then(adventure => {
						if (!adventure)
							return this.Promise.reject(new MoleculerClientError("Adventure not found", 404));

						if (adventure.author !== ctx.meta.user._id.toString())
							return this.Promise.reject(new ForbiddenError());

						const update = {
							"$set": newData
						};

						return this.adapter.updateById(adventure._id, update);
					})
					.then(doc => this.transformDocuments(ctx, { populate: ["author", "favorited", "favoritesCount"]}, doc))
					.then(entity => this.transformResult(ctx, entity, ctx.meta.user))
					.then(json => this.entityChanged("updated", json, ctx).then(() => json));
			}
		},

		/**
		 * List adventures with pagination.
		 *
		 * @actions
		 * @param {String} tag - Filter for 'tag'
		 * @param {String} author - Filter for author ID
		 * @param {String} favorited - Filter for favorited author
		 * @param {Number} limit - Pagination limit
		 * @param {Number} offset - Pagination offset
		 *
		 * @returns {Object} List of adventures
		 */
		list: {
			cache: {
				keys: ["#userID", "tag", "author", "favorited", "limit", "offset"]
			},
			params: {
				tag: { type: "string", optional: true },
				author: { type: "string", optional: true },
				favorited: { type: "string", optional: true },
				limit: { type: "number", optional: true, convert: true },
				offset: { type: "number", optional: true, convert: true },
			},
			handler(ctx) {
				const limit = ctx.params.limit ? Number(ctx.params.limit) : 20;
				const offset = ctx.params.offset ? Number(ctx.params.offset) : 0;

				let params = {
					limit,
					offset,
					sort: ["-createdAt"],
					populate: ["author", "favorited", "favoritesCount"],
					query: {}
				};
				let countParams;

				if (ctx.params.tag)
					params.query.tagList = {"$in" : [ctx.params.tag]};

				return this.Promise.resolve()
					.then(() => {
						if (ctx.params.author) {
							return ctx.call("users.find", { query: { username: ctx.params.author } })
								.then(users => {
									if (users.length == 0)
										return this.Promise.reject(new MoleculerClientError("Author not found"));

									params.query.author = users[0]._id;
								});
						}
						if (ctx.params.favorited) {
							return ctx.call("users.find", { query: { username: ctx.params.favorited } })
								.then(users => {
									if (users.length == 0)
										return this.Promise.reject(new MoleculerClientError("Author not found"));

									return users[0]._id;
								})
								.then(user => {
									return ctx.call("favorites.find", { fields: ["adventure"], query: { user }})
										.then(list => {
											params.query._id = { $in: list.map(o => o.adventure) };
										});
								});
						}
					})
					.then(() => {
						countParams = Object.assign({}, params);
						// Remove pagination params
						if (countParams && countParams.limit)
							countParams.limit = null;
						if (countParams && countParams.offset)
							countParams.offset = null;
					})
					.then(() => this.Promise.all([
						// Get rows
						this.adapter.find(params),

						// Get count of all rows
						this.adapter.count(countParams)

					])).then(res => {
						return this.transformDocuments(ctx, params, res[0])
							.then(docs => this.transformResult(ctx, docs, ctx.meta.user))
							.then(r => {
								r.adventuresCount = res[1];
								return r;
							});
					});
			}
		},

		/**
		 * List adventures from followed authors.
		 * Auth is required!
		 *
		 * @actions
		 * @param {Number} limit - Pagination limit
		 * @param {Number} offset - Pagination offset
		 *
		 * @returns {Object} List of adventures
		 */
		feed: {
			auth: "required",
			cache: {
				keys: ["#userID", "limit", "offset"]
			},
			params: {
				limit: { type: "number", optional: true, convert: true },
				offset: { type: "number", optional: true, convert: true },
			},
			handler(ctx) {
				const limit = ctx.params.limit ? Number(ctx.params.limit) : 20;
				const offset = ctx.params.offset ? Number(ctx.params.offset) : 0;

				let params = {
					limit,
					offset,
					sort: ["-createdAt"],
					populate: ["author", "favorited", "favoritesCount"],
					query: {}
				};
				let countParams;

				return this.Promise.resolve()
					.then(() => {
						return ctx.call("follows.find", { fields: ["follow"], query: { user: ctx.meta.user._id.toString() } })
							.then(list => {
								const authors = _.uniq(_.compact(_.flattenDeep(list.map(o => o.follow))));
								params.query.author = {"$in" : authors};
							});
					})
					.then(() => {
						countParams = Object.assign({}, params);
						// Remove pagination params
						if (countParams && countParams.limit)
							countParams.limit = null;
						if (countParams && countParams.offset)
							countParams.offset = null;
					})
					.then(() => this.Promise.all([
						// Get rows
						this.adapter.find(params),

						// Get count of all rows
						this.adapter.count(countParams)

					])).then(res => {
						return this.transformDocuments(ctx, params, res[0])
							.then(docs => this.transformResult(ctx, docs, ctx.meta.user))
							.then(r => {
								r.adventuresCount = res[1];
								return r;
							});
					});
			}
		},

		/**
		 * Get an adventure by slug
		 *
		 * @actions
		 * @param {String} id - Adventure slug
		 *
		 * @returns {Object} Adventure entity
		 */
		get: {
			cache: {
				keys: ["#userID", "id"]
			},
			params: {
				id: { type: "string" }
			},
			handler(ctx) {
				return this.findBySlug(ctx.params.id)
					.then(entity => {
						if (!entity)
							return this.Promise.reject(new MoleculerClientError("Adventure not found!", 404));

						return entity;
					})
					.then(doc => this.transformDocuments(ctx, { populate: ["author", "favorited", "favoritesCount"] }, doc))
					.then(entity => this.transformResult(ctx, entity, ctx.meta.user));
			}
		},

		/**
		 * Remove an adventure by slug
		 * Auth is required!
		 *
		 * @actions
		 * @param {String} id - Adventure slug
		 *
		 * @returns {Number} Count of removed adventures
		 */
		remove: {
			auth: "required",
			params: {
				id: { type: "any" }
			},
			handler(ctx) {
				return this.findBySlug(ctx.params.id)
					.then(entity => {
						if (!entity)
							return this.Promise.reject(new MoleculerClientError("Adventure not found!", 404));

						if (entity.author !== ctx.meta.user._id.toString())
							return this.Promise.reject(new ForbiddenError());

						return this.adapter.removeById(entity._id)
							.then(() => ctx.call("favorites.removeByAdventure", { adventure: entity._id }))
							.then(json => this.entityChanged("removed", json, ctx).then(() => json));
					});
			}
		},

		/**
		 * Favorite an adventure
		 * Auth is required!
		 *
		 * @actions
		 * @param {String} id - Adventure slug
		 *
		 * @returns {Object} Updated adventure
		 */
		favorite: {
			auth: "required",
			params: {
				slug: { type: "string" }
			},
			handler(ctx) {
				return this.Promise.resolve(ctx.params.slug)
					.then(slug => this.findBySlug(slug))
					.then(adventure => {
						if (!adventure)
							return this.Promise.reject(new MoleculerClientError("Adventure not found", 404));

						return ctx.call("favorites.add", { adventure: adventure._id.toString(), user: ctx.meta.user._id.toString() }).then(() => adventure);
					})
					.then(doc => this.transformDocuments(ctx, { populate: ["author", "favorited", "favoritesCount"] }, doc))
					.then(entity => this.transformResult(ctx, entity, ctx.meta.user));
			}
		},

		/**
		 * Unfavorite an adventure
		 * Auth is required!
		 *
		 * @actions
		 * @param {String} id - Adventure slug
		 *
		 * @returns {Object} Updated adventure
		 */
		unfavorite: {
			auth: "required",
			params: {
				slug: { type: "string" }
			},
			handler(ctx) {
				return this.Promise.resolve(ctx.params.slug)
					.then(slug => this.findBySlug(slug))
					.then(adventure => {
						if (!adventure)
							return this.Promise.reject(new MoleculerClientError("Adventure not found", 404));

						return ctx.call("favorites.delete", { adventure: adventure._id.toString(), user: ctx.meta.user._id.toString() }).then(() => adventure);
					})
					.then(doc => this.transformDocuments(ctx, { populate: ["author", "favorited", "favoritesCount"] }, doc))
					.then(entity => this.transformResult(ctx, entity, ctx.meta.user));
			}
		},

		/**
		 * Get list of available tags
		 *
		 * @returns {Object} Tag list
		 */
		tags: {
			cache: {
				keys: []
			},
			handler(ctx) {
				return this.Promise.resolve()
					.then(() => this.adapter.find({ fields: ["tagList"], sort: ["createdAt"] }))
					.then(list => {
						return _.uniq(_.compact(_.flattenDeep(list.map(o => o.tagList))));
					})
					.then(tags => ({ tags }));
			}
		},

		/**
		 * Get all comments of an adventure.
		 *
		 * @actions
		 * @param {String} slug - Adventure slug
		 *
		 * @returns {Object} Comment list
		 *
		 */
		comments: {
			cache: {
				keys: ["#userID", "slug"]
			},
			params: {
				slug: { type: "string" }
			},
			handler(ctx) {
				return this.Promise.resolve(ctx.params.slug)
					.then(slug => this.findBySlug(slug))
					.then(adventure => {
						if (!adventure)
							return this.Promise.reject(new MoleculerClientError("Adventure not found", 404));

						return ctx.call("comments.list", { adventure: adventure._id.toString() });
					});
			}
		},

		/**
		 * Add a new comment to an adventure.
		 * Auth is required!
		 *
		 * @actions
		 * @param {String} slug - Adventure slug
		 * @param {Object} comment - Comment fields
		 *
		 * @returns {Object} Comment entity
		 */
		addComment: {
			auth: "required",
			params: {
				slug: { type: "string" },
				comment: { type: "object" }
			},
			handler(ctx) {
				return this.Promise.resolve(ctx.params.slug)
					.then(slug => this.findBySlug(slug))
					.then(adventure => {
						if (!adventure)
							return this.Promise.reject(new MoleculerClientError("Adventure not found", 404));

						return ctx.call("comments.create", { adventure: adventure._id.toString(), comment: ctx.params.comment });
					});
			}
		},

		/**
		 * Update a comment.
		 * Auth is required!
		 *
		 * @actions
		 * @param {String} slug - Adventure slug
		 * @param {String} commentID - Comment ID
		 * @param {Object} comment - Comment fields
		 *
		 * @returns {Object} Comment entity
		 */
		updateComment: {
			auth: "required",
			params: {
				slug: { type: "string" },
				commentID: { type: "string" },
				comment: { type: "object" }
			},
			handler(ctx) {
				return this.Promise.resolve(ctx.params.slug)
					.then(slug => this.findBySlug(slug))
					.then(adventure => {
						if (!adventure)
							return this.Promise.reject(new MoleculerClientError("Adventure not found", 404));

						return ctx.call("comments.update", { id: ctx.params.commentID, comment: ctx.params.comment });
					});
			}
		},

		/**
		 * Remove a comment.
		 * Auth is required!
		 *
		 * @actions
		 * @param {String} slug - Adventure slug
		 * @param {String} commentID - Comment ID
		 *
		 * @returns {Number} Count of removed comment
		 */
		removeComment: {
			auth: "required",
			params: {
				slug: { type: "string" },
				commentID: { type: "string" }
			},
			handler(ctx) {
				return this.Promise.resolve(ctx.params.slug)
					.then(slug => this.findBySlug(slug))
					.then(adventure => {
						if (!adventure)
							return this.Promise.reject(new MoleculerClientError("Adventure not found"));

						return ctx.call("comments.remove", { id: ctx.params.commentID });
					});
			}
		}
	},

	/**
	 * Methods
	 */
	methods: {
		/**
		 * Find an adventure by slug
		 *
		 * @param {String} slug - Adventure slug
		 *
		 * @results {Object} Promise<Adventure
		 */
		findBySlug(slug) {
			return this.adapter.findOne({ slug });
		},

		/**
		 * Transform the result entities to follow the RealWorld API spec
		 *
		 * @param {Context} ctx
		 * @param {Array} entities
		 * @param {Object} user - Logged in user
		 */
		transformResult(ctx, entities, user) {
			if (Array.isArray(entities)) {
				return this.Promise.map(entities, item => this.transformEntity(ctx, item, user))
					.then(adventures => ({ adventures }));
			} else {
				return this.transformEntity(ctx, entities, user)
					.then(adventure => ({ adventure }));
			}
		},

		/**
		 * Transform a result entity to follow the RealWorld API spec
		 *
		 * @param {Context} ctx
		 * @param {Object} entity
		 * @param {Object} user - Logged in user
		 */
		transformEntity(ctx, entity, user) {
			if (!entity) return this.Promise.resolve();

			return this.Promise.resolve(entity);
		}
	}
};
