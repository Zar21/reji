export default class Adventures {
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
        //url: this._AppConstants.api + '/adventures' + ((config.type === 'feed') ? '/feed' : ''),
        url: this._AppConstants.api + '/adventures/',
        method: 'GET',
        params: config.filters ? config.filters : null
      };
      return this._$http(request).then((res) => res.data);
    }
  
    get(slug) {
      let deferred = this._$q.defer();
  
      if (!slug.replace(" ", "")) {
        deferred.reject("Adventure slug is empty");
        return deferred.promise;
      }
  
      this._$http({
        url: this._AppConstants.api + '/adventures/' + slug,
        method: 'GET'
      }).then(
        (res) => deferred.resolve(res.data.adventure),
        (err) => deferred.reject(err)
      );
  
      return deferred.promise;
    }
  
    destroy(slug) {
      return this._$http({
        url: this._AppConstants.api + '/adventures/' + slug,
        method: 'DELETE'
      })
    }
  
    save(adventure) {
      let request = {};
  
      if (adventure.slug) {
        request.url = `${this._AppConstants.api}/adventures/${adventure.slug}`;
        request.method = 'PUT';
        delete adventure.slug;
  
      } else {
        request.url = `${this._AppConstants.api}/adventures/`;
        request.method = 'POST';
      }
  
      request.data = { adventure: adventure };
  
      return this._$http(request).then((res) => res.data.adventure);
    }
  
  
    favorite(slug) {
      return this._$http({
        url: this._AppConstants.api + '/adventures/' + slug + '/favorite',
        method: 'POST'
      })
    }
  
    unfavorite(slug) {
      return this._$http({
        url: this._AppConstants.api + '/adventures/' + slug + '/favorite',
        method: 'DELETE'
      })
    }
  
  
  }
  