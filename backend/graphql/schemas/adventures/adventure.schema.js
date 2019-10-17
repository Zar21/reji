import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type Adventure {
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