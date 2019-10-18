import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag'

export default class GraphQL {
    constructor(AppConstants, $q) {
        'ngInject';
    
        this._AppConstants = AppConstants;
        this._$q = $q;
        this._client = new ApolloClient({
            link: new HttpLink({ uri: this._AppConstants.api + '/graphql/' }),
            cache: new InMemoryCache()
        });

    }

    get(query) {
        let deferred = this._$q.defer();
        
        this._client.query({
            query: gql(query),
        }).then(
            (res) => deferred.resolve(res.data),
            (err) => deferred.reject(err)
        );
  
      return deferred.promise;
    }
};
