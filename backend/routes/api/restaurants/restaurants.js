var router = require('express').Router();
var mongoose = require('mongoose');
var Restaurant = mongoose.model('Restaurant');
var User = mongoose.model('User');
const City = mongoose.model('City');
const Country = mongoose.model('Country');
var auth = require('../../auth');

// Preload restaurant objects on routes with ':restaurant'
router.param('restaurant', function(req, res, next, slug) {
  Restaurant.findOne({ slug: slug})
    .then(function (restaurant) {
      if (!restaurant) { return res.sendStatus(404); }

      req.restaurant = restaurant;

      return next();
    }).catch(next);
});

router.get('/', function(req, res, next) {
  var limit = 20;
  var offset = 0;

  if(typeof req.query.limit !== 'undefined'){
    limit = req.query.limit;
  }

  if(typeof req.query.offset !== 'undefined'){
    offset = req.query.offset;
  }

  Promise.all([
    Restaurant.find()
      .limit(Number())
      .skip(Number(offset))
      .exec(),
    Restaurant.count(),
    City.find(),
    Country.find()
  ]).then(function(results){
    var restaurants = results[0];
    var restaurantsCount = results[1];
    var cities = results[2];
    var countries = results[3];

    
    return res.json({
      restaurants: restaurants.map(function(restaurant){
        
        /*
        City.findById(restaurant.city).then(function(city){
          if (!city) { return res.sendStatus(401); }
        
          Country.findById(city.country).then(function(country){
            if (!country) { return res.sendStatus(401); }

            city.country = country;
            restaurant.city = city;
            
            return restaurant.toJSONFor(restaurant.city,city.country);
          }).catch(next);
        }).catch(next);
          
        */


        
        let city;
        for (let i = 0; i < cities.length; i++) {
          const element = cities[i];

          if (String(element._id) == String(restaurant.city)){
            city = element;

            let country;
            for (let i = 0; i < countries.length; i++) {
              const element = countries[i];

              if (String(element._id) == String(city.country)){
                country = element;

                city.country = country;
                restaurant.city = city;                
                
                return restaurant.toJSONFor(restaurant.city,city.country);
              }
            } 
          }
        }

      }),
      restaurantsCount: restaurantsCount
    });

  });
});

//POST WILL ONLY BE AVAILABLE TO ADMINS
router.post('/', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    var restaurant = new Restaurant(req.body.restaurant);

    restaurant.author = user;

    return restaurant.save().then(function(){
      console.log(restaurant.author);
      return res.json({restaurant: restaurant.toJSONFor(user)});
    });
  }).catch(next);
});

// return a restaurant
router.get('/:restaurant', function(req, res, next) {
    return res.json({restaurant: req.restaurant.toJSONFor()});
});

// update restaurant
/* UPDATE WILL ONLY BE AVAILABLE TO ADMINS
router.put('/:restaurant', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if(req.restaurant.author._id.toString() === req.payload.id.toString()){
      if(typeof req.body.restaurant.title !== 'undefined'){
        req.restaurant.title = req.body.restaurant.title;
      }

      if(typeof req.body.restaurant.description !== 'undefined'){
        req.restaurant.description = req.body.restaurant.description;
      }

      if(typeof req.body.restaurant.body !== 'undefined'){
        req.restaurant.body = req.body.restaurant.body;
      }

      if(typeof req.body.restaurant.tagList !== 'undefined'){
        req.restaurant.tagList = req.body.restaurant.tagList
      }

      req.restaurant.save().then(function(restaurant){
        return res.json({restaurant: restaurant.toJSONFor(user)});
      }).catch(next);
    } else {
      return res.sendStatus(403);
    }
  });
});
*/
// delete restaurant
/*DELETE WILL ONLY BE AVAILABLE TO ADMINS
router.delete('/:restaurant', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    if(req.restaurant.author._id.toString() === req.payload.id.toString()){
      return req.restaurant.remove().then(function(){
        return res.sendStatus(204);
      });
    } else {
      return res.sendStatus(403);
    }
  }).catch(next);
});
*/
module.exports = router;
