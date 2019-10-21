function RestaurantConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.restaurant', {
    url: '/restaurant/:slug',
    controller: 'RestaurantCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'restaurant/restaurant.html',
    title: 'Restaurant',
    resolve: {
      restaurant: function(Restaurants, $state, $stateParams) {
        return Restaurants.get($stateParams.slug).then(
          (data) => data.restaurant,
          (err) => $state.go('app.restaurantshop')
        )
      }
    }
  });

};

export default RestaurantConfig;
