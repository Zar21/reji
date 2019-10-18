export default class Cities {
    constructor(AppConstants, $http, $q) {
      'ngInject';
  
      this._AppConstants = AppConstants;
      this._$http = $http;
      this._$q = $q;
  
  
    }

    get(slug) {
      let deferred = this._$q.defer();
      if (!slug.replace(" ", "")) {
        deferred.reject("City slug is empty");
        return deferred.promise;
      }
  
      this._$http({
        url: this._AppConstants.api + "/graphql?query={city(slug:\"" + slug + "\"){slug}}",
        method: 'GET'
      }).then(
        (res) =>
          deferred.resolve(res.data.data.travel),
        (err) => deferred.reject(err)
      );
  
      return deferred.promise;
    }

      /*getAll() {
        // Create the $http object for this request
        let request = {
          //url: this._AppConstants.api + '/products' + ((config.type === 'feed') ? '/feed' : ''),
          url: this._AppConstants.api + "/graphql?query={travels{id name destination {name country {name}}exit {name country {name}}}}",
          method: 'GET',
          //params: config.filters ? config.filters : null
        };
        return this._$http(request).then((res) => res.data);
      }*/
  
  }
  