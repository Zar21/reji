var router = require('express').Router();
var mongoose = require('mongoose');
var Adventure = mongoose.model('Adventure');
var User = mongoose.model('User');
var auth = require('../../auth');

// Preload adventure objects on routes with ':adventure'
router.param('adventure', function(req, res, next, slug) {
  Adventure.findOne({ slug: slug})
    .populate('author')
    .then(function (adventure) {
      if (!adventure) { return res.sendStatus(404); }

      req.adventure = adventure;

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
    Adventure.find()
      .limit(Number(limit))
      .skip(Number(offset))
      .exec(),
    Adventure.count()
  ]).then(function(results){
    var adventures = results[0];
    var adventuresCount = results[1];

    return res.json({
      adventures: adventures.map(function(adventure){
        return adventure.toJSONFor();
      }),
      adventuresCount: adventuresCount
    });
  });
});


//POST WILL ONLY BE AVAILABLE TO ADMINS
router.post('/', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    var adventure = new Adventure(req.body.adventure);

    adventure.author = user;

    return adventure.save().then(function(){
      console.log(adventure.author);
      return res.json({adventure: adventure.toJSONFor(user)});
    });
  }).catch(next);
});

// return a adventure
router.get('/:adventure', function(req, res, next) {
  return res.json({adventure: req.adventure.toJSONFor()});
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
