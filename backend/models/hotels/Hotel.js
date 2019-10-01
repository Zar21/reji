var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');

var HotelSchema = new mongoose.Schema({
  slug: { type: String, lowercase: true, unique: true },
  name: String,
  description: String,
  city: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
  inDate: String,
  outDate: String,
  stars: Number,
  reviewScore: Number,
  features: [String],
  rooms: Number, // * change to room model
  services: String
}, { timestamps: true });

HotelSchema.plugin(uniqueValidator, { message: 'is already taken' });

HotelSchema.pre('validate', function (next) {
  if (!this.slug) {
    this.slugify();
  }
  next();
});

HotelSchema.methods.slugify = function () {
  this.slug = slug(this.name) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

HotelSchema.methods.toJSONFor = function (user) {
  return {
    slug: this.slug,
    name: this.name,
    description: this.description,
    city: this.city,
    inDate: this.inDate,
    outDate: this.outDate,
    stars: this.stars,
    reviewScore: this.reviewScore,
    features: this.features,
    rooms: this.rooms,
    services: this.services
  };
};

mongoose.model('Hotel', HotelSchema);


// db.conduit_nodejs.insert({
// 	"hotel": {
// 	    "name": "third-name",
// 	    "description": "asdasdsadsadasdasdsad",
// 	    "location": "Ontinyent",
// 	    "inDate": "indate",
// 	    "outDate": "outDate",
// 	    "stars": 5,
// 	    "reviewScore": 7,
// 	    "features": "asdasdasda",
// 	    "rooms": 4,
// 	    "services": "asdasdasd"

// 	}
// })