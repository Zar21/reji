var router = require('express').Router();
var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');
var User = mongoose.model('User');
var auth = require('../../auth');
var city = mongoose.model("City");
// var room = mongoose.model("Room");

// Preload adventure objects on routes with ':adventure'
router.param('hotel', function (req, res, next, slug) {
  Hotel.findOne({ slug: slug })
    .then(function (hotel) {
      console.log(hotel);
      if (!hotel) { return res.sendStatus(404); }

      req.hotel = hotel;

      return next();
    }).catch(next);
});

router.get('/', function(req, res, next) {
  var limit = 8;
  var offset = 0;

  if(typeof req.query.limit !== 'undefined'){
    limit = req.query.limit;
  }

  if(typeof req.query.offset !== 'undefined'){
    offset = req.query.offset;
  }

  Promise.all([
    Hotel.find()
      .limit(Number(limit))
      .skip(Number(offset))
      .exec(),
    Hotel.count()
  ]).then(function(results){
    var hotels = results[0];
    var hotelsCount = results[1];

    return res.json({
      hotels: hotels.map(function(hotels){
        return hotels.toJSONFor();
      }),
      hotelsCount: hotelsCount
    });
  });
});






// * POST WILL ONLY BE AVAILABLE TO ADMINS
router.post('/', function (req, res, next) {

    console.log(req.body);
    city.findOne({"slug": req.body.hotel.city}).then(function(city){
      console.log(city);
      if (!city) {
        req.body.hotel.city = null;
      }
      var hotel = new Hotel(req.body.hotel);

      hotel.city = city._id;

      return hotel.save().then(function () {

        return res.json({ hotel: hotel.toJSONFor() });
      });

    }).catch(next);

    
    // console.log(hotel);

    
  // }).catch(next);
  
});




// return a hotel
router.get('/:hotel', function(req, res, next) {
  const request = require('request');
  request('http://graphql:3002/api?query={restaurants(city:"5dc2e81a203c9321cafe46bd"){slug id title image reservePrice}}', function (error, response, body) {
    if (error) {
      console.error('error:', error); 
    } else {
      let results = JSON.parse(body);
      return res.json({hotel: req.hotel.toJSONFor(),restaurants: results.data.restaurants});
    }
  });
});

// update adventure
/* UPDATE WILL ONLY BE AVAILABLE TO ADMINS
router.put('/:adventure', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if(req.adventure.author._id.toString() === req.payload.id.toString()){
      if(typeof req.body.adventure.title !== 'undefined'){
        req.adventure.title = req.body.adventure.title;
      }

      if(typeof req.body.adventure.description !== 'undefined'){
        req.adventure.description = req.body.adventure.description;
      }

      if(typeof req.body.adventure.body !== 'undefined'){
        req.adventure.body = req.body.adventure.body;
      }

      if(typeof req.body.adventure.tagList !== 'undefined'){
        req.adventure.tagList = req.body.adventure.tagList
      }

      req.adventure.save().then(function(adventure){
        return res.json({adventure: adventure.toJSONFor(user)});
      }).catch(next);
    } else {
      return res.sendStatus(403);
    }
  });
});
*/
// delete adventure
/*DELETE WILL ONLY BE AVAILABLE TO ADMINS
router.delete('/:adventure', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    if(req.adventure.author._id.toString() === req.payload.id.toString()){
      return req.adventure.remove().then(function(){
        return res.sendStatus(204);
      });
    } else {
      return res.sendStatus(403);
    }
  }).catch(next);
});
*/
module.exports = router;
