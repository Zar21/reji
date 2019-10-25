var router = require('express').Router();
var mongoose = require('mongoose');
var Travel = mongoose.model('Travel');
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

//POST WILL ONLY BE AVAILABLE TO ADMINS
router.post('/', function(req, res, next) {
    Promise.all([
        City.findOne({"slug":req.body.travel.destination}),
        City.findOne({"slug":req.body.travel.exit})
    ]).then(function(cities) {
        if (!cities[0]) { req.body.travel.destination = null;}
        if (!cities[1]) { req.body.travel.exit = null;}
        var travel = new Travel(req.body.travel);
        travel.destination = cities[0]._id;
        travel.exit = cities[1]._id;
        return travel.save().then(function(){
            return res.json({travel: travel.toJSONFor()});
        });
    }).catch(next);
});

router.get('/', function(req, res, next) {
  Promise.all([
    Travel.find().populate({ path: 'city'})
  ]).then(function(results){
    return res.json(results);
  }).catch(next);
});
// return a city
router.get('/:city', function(req, res, next) {
    Promise.all([
      req.city.populate('country').execPopulate()
    ]).then(function(results){
      return res.json({city: results[0]});
    }).catch(next);
});

module.exports = router;