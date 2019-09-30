var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');

var ProductSchema = new mongoose.Schema({
  slug: {type: String, lowercase: true, unique: true},
  title: String,
  description: String,
  price: Number,
}, {timestamps: true});

ProductSchema.plugin(uniqueValidator, {message: 'is already taken'});

ProductSchema.pre('validate', function(next){
  if(!this.slug)  {
    this.slugify();
  }
  next();
});

ProductSchema.methods.slugify = function() {
  this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

ProductSchema.methods.toJSONFor = function(user){
  return {
    slug: this.slug,
    title: this.title,
    description: this.description,
    price: this.price,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

mongoose.model('Product', ProductSchema);