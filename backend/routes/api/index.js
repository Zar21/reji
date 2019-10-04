var router = require('express').Router();

router.use('/', require('./users'));
router.use('/profiles', require('./profiles'));
router.use('/articles', require('./articles'));
router.use('/tags', require('./tags'));
router.use('/contact', require('./contact'));
router.use('/products', require('./products/products'));
router.use('/hotels', require('./hotels/hotels'));
router.use('/cities', require('./travels/cities'));
router.use('/countries', require('./travels/countries'));
router.use('/restaurants', require('./restaurants/restaurants'));
router.use('/graphql', require('./graphql'));
// var bodyParser = require('body-parser');
// var mongoose = require('mongoose');
// var Restaurant = mongoose.model('Restaurant');



// https://medium.com/codingthesmartway-com-blog/creating-a-graphql-server-with-node-js-and-express-f6dddc5320e1
// var express_graphql = require('express-graphql'),
//     { buildSchema} = require('graphql');

// // import schema from '../../graphql/schemas/schema.js';
// // import resolver from '../../graphql/resolvers/resolver.js';


// var schema = buildSchema(`
//     type Query {
//         message: String
//         restaurant(slug: String!): Restaurant
//         restaurants: [Restaurant]
//     }
//     type Restaurant {
//         id: ID!
//         slug: String!
//         title: String
//         description: String
//         price: Int
//         createdAt: String
//         updatedAt: String
//     }
// `);

// var resolver = {
//     restaurant: (args) => {
//       let slug = args.slug;
//       return Restaurant.findOne({slug: slug});
//     },
//     restaurants: () => {
//       return Restaurant.find();
//     },
//     message: () => 'Hello World!'
    
// }

// //// GraphQL ////
// router.use('/graphql',bodyParser.json(), express_graphql({
//     schema: schema,
//     rootValue: resolver,
//     graphiql: true
// }));

router.use(function(err, req, res, next){
  if(err.name === 'ValidationError'){
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function(errors, key){
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }

  return next(err);
});

module.exports = router;