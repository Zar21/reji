export default class Products {
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
        //url: this._AppConstants.api + '/products' + ((config.type === 'feed') ? '/feed' : ''),
        url: this._AppConstants.api + '/products/',
        method: 'GET',
        params: config.filters ? config.filters : null
      };
      return this._$http(request).then((res) => res.data);
    }
  
    get(slug) {
      let deferred = this._$q.defer();
  
      if (!slug.replace(" ", "")) {
        deferred.reject("Product slug is empty");
        return deferred.promise;
      }
  
      this._$http({
        url: this._AppConstants.api + '/products/' + slug,
        method: 'GET'
      }).then(
        (res) => deferred.resolve(res.data.product),
        (err) => deferred.reject(err)
      );
  
      return deferred.promise;
    }
  
    destroy(slug) {
      return this._$http({
        url: this._AppConstants.api + '/products/' + slug,
        method: 'DELETE'
      })
    }
  
    save(product) {
      let request = {};
  
      if (product.slug) {
        request.url = `${this._AppConstants.api}/products/${product.slug}`;
        request.method = 'PUT';
        delete product.slug;
  
      } else {
        request.url = `${this._AppConstants.api}/products/`;
        request.method = 'POST';
      }
  
      request.data = { product: product };
  
      return this._$http(request).then((res) => res.data.product);
    }
  
  
    favorite(slug) {
      return this._$http({
        url: this._AppConstants.api + '/products/' + slug + '/favorite',
        method: 'POST'
      })
    }
  
    unfavorite(slug) {
      return this._$http({
        url: this._AppConstants.api + '/products/' + slug + '/favorite',
        method: 'DELETE'
      })
    }
  
  
  }
  