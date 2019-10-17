import { gql } from 'apollo-server-express';

const typeDefs = gql`
    extend type Query {
        hotel(slug: String!): Hotel
        hotels: [Hotel]
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
`;

export default typeDefs;