var router = require('express').Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Restaurant = mongoose.model('Restaurant');

// var express_graphql = require('express-graphql'),
//     { buildSchema} = require('graphql');

// import { makeExecutableSchema } from 'graphql-tools';

// import schemas from '../../graphql/schemas/schema.js';
// import resolvers from '../../graphql/resolvers/resolver.js';
import { gql } from 'apollo-server-express';
// import { ApolloServer } from "apollo-server-express"



const typeDefs = gql`
    type Query {
        message: String
        restaurant(slug: String!): Restaurant
        restaurants: [Restaurant]
    }
    type Restaurant {
        id: ID!
        slug: String!
        title: String
        description: String
        price: Int
        createdAt: String
        updatedAt: String
    }
`;

const resolvers = {
    Query: {
        restaurant: (args) => {
            let slug = args.slug;
            return Restaurant.findOne({slug: slug});
        },
        restaurants: () => {
            return Restaurant.find();
        },
        message: () => 'Hello World!'
    }
}

// const schema = makeExecutableSchema({
//     typeDefs,
//     resolvers
// });
// const SERVER = new ApolloServer({
//     typeDefs,
//     resolvers
// })
// SERVER.applyMiddleware({ router });

// router.use('/graphql', bodyParser.json(), graphqlExpress({
//     schema,
//     context: {
//         Restaurant
//     }
// }))
  
// router.use('/graphiql', graphiqlExpress({
//     endpointURL: '/graphql',
// }));


// var schemas = buildSchema(`
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

// var resolvers = {
//     restaurant: (args) => {
//       let slug = args.slug;
//       return Restaurant.findOne({slug: slug});
//     },
//     restaurants: () => {
//       return Restaurant.find();
//     },
//     message: () => 'Hello World!'
    
// }

//// GraphQL ////
// router.use('/graphql',bodyParser.json(), express_graphql({
//     schema: schemas,
//     rootValue: resolvers,
//     graphiql: true
// }));

module.exports = router;