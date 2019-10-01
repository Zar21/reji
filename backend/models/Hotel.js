var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');

var HotelSchema = new mongoose.Schema({
  slug: {type: String, lowercase: true, unique: true},
  name: String,
  description: String,
  location: String,
  inDate: String,
  outDate: String,
  stars: Number,
  reviewScore: Number,
  features: String,
  rooms: Number,
  services: String
}, {timestamps: true});

HotelSchema.plugin(uniqueValidator, {message: 'is already taken'});

HotelSchema.pre('validate', function(next){
  if(!this.slug)  {
    this.slugify();
  }
  next();
});

HotelSchema.methods.slugify = function() {
  this.slug = slug(this.name) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

HotelSchema.methods.toJSONFor = function(user){
  return {
    slug: this.slug,
    name: this.name
  };
};

mongoose.model('Hotel', HotelSchema);