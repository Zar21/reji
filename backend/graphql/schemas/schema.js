import { gql } from 'apollo-server-express';

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

export default typeDefs;
