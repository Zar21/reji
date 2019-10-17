export default class Travels {
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
    /*query(config) {
      // Create the $http object for this request
      let request = {
        //url: this._AppConstants.api + '/articles' + ((config.type === 'feed') ? '/feed' : ''),
        url: this._AppConstants.api + '/graphql?query={travels{id name destination {name country {name}}exit {name country {name}}}}',
        method: 'GET',
        //params: config.filters ? config.filters : null
      };
      return this._$http(request).then((res) => res.data);
    }*/
  
    //get one travel using graphql
    get(slug) {
      let deferred = this._$q.defer();
      if (!slug.replace(" ", "")) {
        deferred.reject("Travel slug is empty");
        return deferred.promise;
      }
  
      this._$http({
        url: this._AppConstants.api + "/graphql?query={travel(slug:\"" + slug + "\"){id name destination {name country {name}}exit {name country {name}}}}",
        method: 'GET'
      }).then(
        (res) =>
          deferred.resolve(res.data.data.travel),
        (err) => deferred.reject(err)
      );
  
      return deferred.promise;
    }
  
    //get all travels
    getAll() {
      let deferred = this.$q.defer();
      this._$http({
        url: this._AppConstants.api + "/graphql?query={travels{id name destination {name country {name}}exit {name country {name}}}}",
        method: 'GET',
        params
      }).then(
        (res) => deferred.resolve(res.data.data.travels),
        (err) => deferred.reject(err)
      );
    
        return deferred.promise;
      }
    /*destroy(slug) {
      return this._$http({
        url: this._AppConstants.api + '/articles/' + slug,
        method: 'DELETE'
      })
    }
  
    save(article) {
      let request = {};
  
      if (article.slug) {
        request.url = `${this._AppConstants.api}/articles/${article.slug}`;
        request.method = 'PUT';
        delete article.slug;
  
      } else {
        request.url = `${this._AppConstants.api}/articles/`;
        request.method = 'POST';
      }
  
      request.data = { article: article };
  
      return this._$http(request).then((res) => res.data.article);
    }*/
  
  
    /*favorite(slug) {
      return this._$http({
        url: this._AppConstants.api + '/articles/' + slug + '/favorite',
        method: 'POST'
      })
    }
  
    unfavorite(slug) {
      return this._$http({
        url: this._AppConstants.api + '/articles/' + slug + '/favorite',
        method: 'DELETE'
      })
    }*/
  
  
  }
  