// useless
/*
var router = require('express').Router();

// import schemas from '../../graphql/schemas/schema.js';
// import resolvers from '../../graphql/resolvers/resolver.js';

// https://dev.to/amanhimself/creating-a-graphql-server-with-nodejs-17a3
const mongoose = require('mongoose');
const Restaurant = mongoose.model('Restaurant');
import { gql } from 'apollo-server-express';
import { ApolloServer } from "apollo-server-express"



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

const SERVER = new ApolloServer({
    typeDefs,
    resolvers
});
SERVER.applyMiddleware({ app: router, path:'/graphql' });
// console.log(router);

module.exports = router;
*/