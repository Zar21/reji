function ResultsConfig($stateProvider) {
    'ngInject';
  
    $stateProvider
    .state('app.results', {
      url: '/results/:city/:indate/:outdate',
      controller: 'ResultsCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'results/results.html',
      title: 'Results',
      resolve: {
        /*hotels: function($state, $stateParams, Hotels, Slug) {
            return Hotels.getHotelsByCity(Slug.slugify($stateParams.city));
        },
        restaurants: function($state, $stateParams, Restaurants, Slug) {
          return Restaurants.getRestaurantsByCity(Slug.slugify($stateParams.city));
        },
        city: function($state, $stateParams, Cities, Slug) {
          return Cities.get(Slug.slugify($stateParams.city));
        },*/
        results: function($state, $stateParams, Cities, Slug) {
          console.log("hey");
          return Cities.getResults(Slug.slugify($stateParams.city));
        }
      }
    });
  
  };
  
  export default ResultsConfig;
  