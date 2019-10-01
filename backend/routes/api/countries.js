var router = require('express').Router();
var mongoose = require('mongoose');
var Country = mongoose.model('Country');

// Preload product objects on routes with ':product'
router.param('country', function(req, res, next, slug) {
  Country.findOne({ slug: slug})
    .then(function (country) {
      if (!country) { return res.sendStatus(404); }

      req.country = country;

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
      Country.find()
        .limit(Number(limit))
        .skip(Number(offset))
        .exec(),
      Country.count()
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
    console.log(req.body.country);
    var country = new Country(req.body.country);

    return country.save().then(function(){
      return res.json({country: country.toJSONFor(country)});
    });
});

// return a country
router.get('/:country', function(req, res, next) {
    return res.json({country: req.country.toJSONFor(user)});
});

module.exports = router;
