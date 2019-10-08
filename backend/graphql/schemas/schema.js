import { gql } from 'apollo-server-express';

const typeDefs = gql`
    scalar Date
    type Query {
        message: String
        restaurant(slug: String!): Restaurant
        restaurants: [Restaurant]
        product(slug: String!): Product
        products: [Product]
        hotel(slug: String!): Hotel
        hotels: [Hotel]
        room(slug: String!): Room
        rooms: [Room]
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
    type Product {
        id: ID!
        slug: String!
        title: String
        description: String
        price: Int
        createdAt: Date
        updatedAt: Date
    }
    type Hotel {
        id: ID!
        slug: String!
        name: String
        description: String
        city: String
        inDate: String
        outDate: String
        stars: Int
        reviewScore: Int
        features: [String]
        rooms: Int
        services: String
    }
    type Room {
        id: ID!
        beds: Int
        equipment: [String]
        occupied: Boolean
    }
`;

export default typeDefs;
