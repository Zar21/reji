export default class Contact {
    constructor (AppConstants, $http) {
      'ngInject';
  
      this._AppConstants = AppConstants;
      this._$http = $http;
  
    }
    send(data) {
        return this._$http({
            url: this._AppConstants.api + '/contact/send',
            method: 'POST',
            data: data
        }).then((res) => res.data,(err) => console.log(err));
    }
}
  