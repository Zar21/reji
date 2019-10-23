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
      restaurant: function(Restaurants, $state, $stateParams,toaster) {
        return Restaurants.get($stateParams.slug).then(
          (data) => {
            return data.restaurant;
          },
          (err) => {
            toaster.pop('error', 'Error', err);
            console.log(err);
            $state.go('app.restaurantshop')
          }
        )
      }
    }
  });

};

export default RestaurantConfig;
