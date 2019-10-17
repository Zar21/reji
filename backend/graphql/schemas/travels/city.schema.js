import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type City {
        id: ID!
        slug: String!
        name: String
        latitude: Float
        longitude: Float
        country: Country
    }
`;

export default typeDefs;