import { gql } from 'apollo-server-express';
// https://graphql.org/learn/queries/

const typeDefs = gql`
    scalar Date
    type Query {
        message: String
        restaurant(slug: String!): Restaurant
        restaurants(limit: Int, offset: Int): [Restaurant]
        product(slug: String!): Product
        products: [Product]
        hotel(slug: String!): Hotel
        hotels: [Hotel]
        room(slug: String!): Room
        rooms: [Room]
        city(slug: String!): City
        cities: [City]
        country(slug: String!): Country
        countries: [Country]
        travel(slug: String!): Travel
        travels: [Travel]
    }
    type Mutation {
        createRestaurant(input: RestaurantInput): Restaurant
        updateRestaurant(slug: String!, input: RestaurantInput): Restaurant
    }
    type Restaurant {
        id: ID!
        slug: String!
        title: String
        description: String
        reservePrice: Int,
        city: City
        streetAddress: String
        image: String
    }
    input RestaurantInput {
        title: String!
        description: String
        reservePrice: Int,
        city: String
        streetAddress: String
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
        city: City
        stars: Int
        reviewScore: Int
        features: [String]
        rooms: Int
        services: [String]
    }
    type Room {
        id: ID!
        beds: Int
        equipment: [String]
        occupied: Boolean
    }
    type City {
        id: ID!
        slug: String!
        name: String
        latitude: Float
        longitude: Float
        country: Country
    }
    type Country {
        id: ID!
        slug: String!
        name: String
        description: String
    }
    type Travel {
        id: ID!
        slug: String!
        name: String
        description: String
        destination: City
        exit: City
        price: Float
    }
    type User {
        id: ID!
        social: String
        username: String
        email: String
        image: String
        bio: String
        hash: String
        salt: String
    }
`;

export default typeDefs;
