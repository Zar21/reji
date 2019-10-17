import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type Country {
        id: ID!
        slug: String!
        name: String
        description: String
    }
`;

export default typeDefs;