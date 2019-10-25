export default class Cities {
    constructor(AppConstants, $http, $q, GraphQLClient) {
      'ngInject';
  
      this._AppConstants = AppConstants;
      this._$http = $http;
      this._$q = $q;
      this._GQL = GraphQLClient;
  
    }

    get(slug) {
      let deferred = this._$q.defer();
      if (!slug.replace(" ", "")) {
        deferred.reject("City slug is empty");
        return deferred.promise;
      }
  
      this._$http({
        url: this._AppConstants.api_gql + "/graphql?query={city(slug:\"" + slug + "\"){slug name latitude longitude country{slug name description}}}",
        method: 'GET'
      }).then(
        (res) =>
          deferred.resolve(res.data.data.city),
        (err) => deferred.reject(err)
      );
  
      return deferred.promise;
    }

    getResults(city) {
      let query;
      if (city != null && city != '') {
        query = `
          query {
            restaurantsResults(slug:"${city}") {
                id
                slug
                title
                description
                reservePrice
                streetAddress
                image
              },
              hotelsResults(slug:"${city}") {
                id
                slug
                name
                description
                stars
                reviewScore
                features
                image
                rooms
                services
              },
              city(slug:"${city}") {
                slug
                name
                latitude
                longitude
                country {
                  slug
                  name
                  description
                }
              }
          }
        `;
      } 
      else {
        query = `
        query {
          restaurants {
              id
              slug
              title
              description
              reservePrice
              streetAddress
              image
            },
            hotels {
              id
              slug
              name
              description
              stars
              reviewScore
              features
              image
              rooms
              services
            }
        }
        `;
      }
      return this._GQL.get(query);
    }
    
      getAll() {
        let query = `
        query {
          cities {
            name
          }
        }
      `;
        return this._GQL.get(query);
      }
  
  }