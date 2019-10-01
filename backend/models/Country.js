var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');

var CountrySchema = new mongoose.Schema({
  slug: {type: String, lowercase: true, unique: true},
  name: String,
  description: String,
}, {timestamps: true});

CountrySchema.plugin(uniqueValidator, {message: 'is already taken'});

CountrySchema.pre('validate', function(next){
  if(!this.slug)  {
    this.slugify();
  }
  next();
});

CountrySchema.methods.slugify = function() {
  this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

CountrySchema.methods.toJSONFor = function(user){
  return {
    slug: this.slug,
    name: this.name,
    description: this.description,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

mongoose.model('Country', CountrySchema);