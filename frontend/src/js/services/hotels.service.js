export default class Hotels {
    constructor(AppConstants, $http, $q, GraphQLClient) {
      'ngInject';
  
      this._AppConstants = AppConstants;
      this._$http = $http;
      this._$q = $q;
      this._GQL = GraphQLClient;
  
    }
  
    /*
      Config object spec:
  
      {
        type: String [REQUIRED] - Accepts "all", "feed"
        filters: Object that serves as a key => value of URL params (i.e. {author:"ericsimons"} )
      }
    */
    query(config) {
      console.log(config);
      // Create the $http object for this request
      let request = {
        //url: this._AppConstants.api + '/hotels' + ((config.type === 'feed') ? '/feed' : ''),
        url: this._AppConstants.api + '/hotels/',
        method: 'GET',
        params: config.filters ? config.filters : null
      };
      return this._$http(request).then((res) => res.data);
    }
  
    get(slug) {
      let deferred = this._$q.defer();
  
      if (!slug.replace(" ", "")) {
        deferred.reject("Hotel slug is empty");
        return deferred.promise;
      }
  
      this._$http({
        url: this._AppConstants.api + '/hotels/' + slug,
        method: 'GET'
      }).then(
        (res) => {
          // console.log(res.data);
          
          deferred.resolve(res.data);
        },
        (err) => deferred.reject(err)
      );
  
      return deferred.promise;
    }
    //graphql request to get all hotels
    getAll() {
      let query = `{
        hotels {
          slug 
          name 
          description 
          city{
            slug
            name 
            latitude 
            longitude 
            country{
              slug 
              name 
              description
            }
          }
          stars 
          reviewScore 
          features 
          image 
          rooms 
          services
        }
      }`;
      return this._GQL.get(query);
      // let request = {
      //   //url: this._AppConstants.api + '/products' + ((config.type === 'feed') ? '/feed' : ''),
      //   url: this._AppConstants.api_gql + "/graphql?query={hotels{slug name description city{slug name latitude longitude country{slug name description}}stars reviewScore features image rooms services}}",
      //   method: 'GET',
      //   //params: config.filters ? config.filters : null
      // };
      // return this._$http(request).then((res) => res.data);
    }
    getHotelsByCity(city) {
      let query = `
        query {
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
            }
        }
      `;
      return this._GQL.get(query);
    }
    destroy(slug) {
      return this._$http({
        url: this._AppConstants.api + '/hotels/' + slug,
        method: 'DELETE'
      })
    }
  
    save(hotel) {
      let request = {};
  
      if (hotel.slug) {
        request.url = `${this._AppConstants.api}/hotels/${hotel.slug}`;
        request.method = 'PUT';
        delete hotel.slug;
  
      } else {
        request.url = `${this._AppConstants.api}/hotels/`;
        request.method = 'POST';
      }
  
      request.data = { hotel: hotel };
  
      return this._$http(request).then((res) => res.data.hotel);
    }
  
  
    favorite(slug) {
      return this._$http({
        url: this._AppConstants.api + '/hotels/' + slug + '/favorite',
        method: 'POST'
      })
    }
  
    unfavorite(slug) {
      return this._$http({
        url: this._AppConstants.api + '/hotels/' + slug + '/favorite',
        method: 'DELETE'
      })
    }
  
  
  }
  