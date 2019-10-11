export default class Restaurants {
    constructor(AppConstants, $http, $q) {
      'ngInject';
  
      this._AppConstants = AppConstants;
      this._$http = $http;
      this._$q = $q;
  
  
    }
  
    /*
      Config object spec:
  
      {
        type: String [REQUIRED] - Accepts "all", "feed"
        filters: Object that serves as a key => value of URL params (i.e. {author:"ericsimons"} )
      }
    */
    query(config) {
      // Create the $http object for this request
      let request = {
        //url: this._AppConstants.api + '/restaurants' + ((config.type === 'feed') ? '/feed' : ''),
        url: this._AppConstants.api + '/restaurants/',
        method: 'GET',
        params: config.filters ? config.filters : null
      };
      return this._$http(request).then((res) => res.data);
    }
  
    get(slug) {
      let deferred = this._$q.defer();
  
      if (!slug.replace(" ", "")) {
        deferred.reject("Restaurant slug is empty");
        return deferred.promise;
      }
  
      this._$http({
        url: this._AppConstants.api + '/restaurants/' + slug,
        method: 'GET'
      }).then(
        (res) => deferred.resolve(res.data.restaurant),
        (err) => deferred.reject(err)
      );
  
      return deferred.promise;
    }
  
    destroy(slug) {
      return this._$http({
        url: this._AppConstants.api + '/restaurants/' + slug,
        method: 'DELETE'
      })
    }
  
    save(restaurant) {
      let request = {};
  
      if (restaurant.slug) {
        request.url = `${this._AppConstants.api}/restaurants/${restaurant.slug}`;
        request.method = 'PUT';
        delete restaurant.slug;
  
      } else {
        request.url = `${this._AppConstants.api}/restaurants/`;
        request.method = 'POST';
      }
  
      request.data = { restaurant: restaurant };
  
      return this._$http(request).then((res) => res.data.restaurant);
    }
  
  
    favorite(slug) {
      return this._$http({
        url: this._AppConstants.api + '/restaurants/' + slug + '/favorite',
        method: 'POST'
      })
    }
  
    unfavorite(slug) {
      return this._$http({
        url: this._AppConstants.api + '/restaurants/' + slug + '/favorite',
        method: 'DELETE'
      })
    }
  
  
  }
  