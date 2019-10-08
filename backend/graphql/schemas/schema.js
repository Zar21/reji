import { gql } from 'apollo-server-express';

const typeDefs = gql`
    scalar Date
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
        createdAt: Date
        updatedAt: Date
    }
`;

export default typeDefs;
