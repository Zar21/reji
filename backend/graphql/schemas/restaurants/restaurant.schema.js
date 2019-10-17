import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type Restaurant {
        id: ID!
        slug: String!
        title: String
        description: String
        reservePrice: Int
        city: City
        streetAddress: String
        image: String
    }
    input RestaurantInput {
        title: String!
        description: String
        reservePrice: Int
        city: String
        streetAddress: String
        image: String
    }
`;

export default typeDefs;