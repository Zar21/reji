var router = require('express').Router();
var mongoose = require('mongoose');
var City = mongoose.model('City');

// Preload product objects on routes with ':product'
router.param('city', function(req, res, next, slug) {
  City.findOne({ slug: slug})
    .then(function (city) {
      if (!city) { return res.sendStatus(404); }

      req.city = city;

      return next();
    }).catch(next);
});

/*router.get('/feed', auth.required, function(req, res, next) {
  var limit = 20;
  var offset = 0;

  if(typeof req.query.limit !== 'undefined'){
    limit = req.query.limit;
  }

  if(typeof req.query.offset !== 'undefined'){
    offset = req.query.offset;
  }

  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    Promise.all([
      City.find()
        .limit(Number(limit))
        .skip(Number(offset))
        .exec(),
      City.count()
    ]).then(function(results){
      var cities = results[0];
      var citiesCount = results[1];

      return res.json({
        cities: cities.map(function(product){
          return cities.toJSONFor(user);
        }),
        citiesCount: citiesCount
      });
    }).catch(next);
  });
});*/

//POST WILL ONLY BE AVAILABLE TO ADMINS
router.post('/', function(req, res, next) {

    var city = new City(req.body.city);

    return city.save().then(function(){
      return res.json({city: city.toJSONFor(city)});
    });
});

// return a city
router.get('/:city', function(req, res, next) {
    return res.json({city: req.city.toJSONFor(user)});
});

module.exports = router;
