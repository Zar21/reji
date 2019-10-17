// https://graphql.org/learn/queries/ 

/* Pagination
 https://codeburst.io/graphql-pagination-by-example-part-1-15ec3313ae08
 https://codeburst.io/graphql-pagination-by-example-part-2-2803802ef23a */

/* Nested resolvers
 https://reactgo.com/nested-resolvers-relationaldata-graphql/ */

/* Modularising
 https://blog.apollographql.com/modularizing-your-graphql-schema-code-d7f71d5ed5f2 */

import { ApolloServer } from "apollo-server-express"
import typeDefs from "../../graphql/schemas/schema";
import resolvers from "../../graphql/resolvers/resolver";

const SERVER = new ApolloServer({
    typeDefs,
    resolvers
});

export default SERVER;