import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type Room {
        id: ID!
        beds: Int
        equipment: [String]
        occupied: Boolean
    }
`;

export default typeDefs;