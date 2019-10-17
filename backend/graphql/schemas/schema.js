import { gql } from 'apollo-server-express';
// https://graphql.org/learn/queries/

const Query = gql`
    scalar Date
    type Query {
        message: String

        restaurant(slug: String!): Restaurant
        restaurants(limit: Int, offset: Int): [Restaurant]

        adventure(slug: String!): Adventure
        adventures: [Adventure]

        hotel(slug: String!): Hotel
        hotels: [Hotel]

        room(slug: String!): Room
        rooms: [Room]

        city(slug: String!): City
        cities: [City]
        
        country(slug: String!): Country
        countries: [Country]
    }
    type Mutation {
        createRestaurant(input: RestaurantInput): Restaurant
        updateRestaurant(slug: String!, input: RestaurantInput): Restaurant
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


import Restaurant from "../../graphql/schemas/restaurants/restaurant.schema";
import Country from "../../graphql/schemas/travels/country.schema";
import City from "../../graphql/schemas/travels/city.schema";
import Hotel from "../../graphql/schemas/hotels/hotel.schema";
import Room from "../../graphql/schemas/hotels/room.schema";
import Adventure from "../../graphql/schemas/adventures/adventure.schema";

const typeDefs = [
    Query,
    Restaurant,
    Country,
    City,
    Hotel,
    Room,
    Adventure
];

export default typeDefs;
