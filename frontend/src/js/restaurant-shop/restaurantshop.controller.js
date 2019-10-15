class RestaurantShopCtrl {
  constructor(User, Tags, AppConstants, $scope) {
    'ngInject';

    this.appName = AppConstants.appName;
    this._$scope = $scope;

    this.listConfig = {
      type: User.current ? 'feed' : 'all'
    };
  }
}

export default RestaurantShopCtrl;
