class TravelsCtrl {
  constructor(User, Tags, AppConstants, $scope, Travels) {
    'ngInject';

    this.appName = AppConstants.appName;
    this._$scope = $scope;
    Travels.get("testtravel").then(
      (res) => {
        console.log(res);
      }
    );

  }
}

export default TravelsCtrl;
