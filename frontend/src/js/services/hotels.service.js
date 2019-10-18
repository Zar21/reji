export default class Hotels {
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
        (res) => deferred.resolve(res.data.hotel),
        (err) => deferred.reject(err)
      );
  
      return deferred.promise;
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
  