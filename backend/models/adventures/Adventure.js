var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');

var AdventureSchema = new mongoose.Schema({
  slug: {type: String, lowercase: true, unique: true},
  title: String,
  description: String,
  price: Number,
  image: String
}, {timestamps: true});

AdventureSchema.plugin(uniqueValidator, {message: 'is already taken'});

AdventureSchema.pre('validate', function(next){
  if(!this.slug)  {
    this.slugify();
  }
  next();
});

AdventureSchema.methods.slugify = function() {
  this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

AdventureSchema.methods.toJSONFor = function(user){
  return {
    slug: this.slug,
    title: this.title,
    description: this.description,
    price: this.price,
    image: this.image,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

mongoose.model('Adventure', AdventureSchema);