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
	]
};
