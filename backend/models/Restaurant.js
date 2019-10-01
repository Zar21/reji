var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');

var RetaurantSchema = new mongoose.Schema({
  slug: {type: String, lowercase: true, unique: true},
  title: String,
  description: String,
  price: Number,
}, {timestamps: true});

RetaurantSchema.plugin(uniqueValidator, {message: 'is already taken'});

RetaurantSchema.pre('validate', function(next){
  if(!this.slug)  {
    this.slugify();
  }
  next();
});

RetaurantSchema.methods.slugify = function() {
  this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

RetaurantSchema.methods.toJSONFor = function(){
  return {
    slug: this.slug,
    title: this.title,
    description: this.description,
    price: this.price,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

mongoose.model('Restaurant', RetaurantSchema);