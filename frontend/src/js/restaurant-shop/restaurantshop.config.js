function RestaurantShopConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.restaurantshop', {
    url: '/restaurantshop',
    controller: 'RestaurantShopCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'restaurant-shop/restaurantshop.html',
    title: 'Restaurant Shop'
  });

};

export default RestaurantShopConfig;
