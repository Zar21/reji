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
        hotels: function($state, $stateParams, Hotels) {
            return Hotels.getAll();
        },
        // restaurants: function($state, $stateParams, Restaurants) {
        //   return Hotels.getAll();
        // },
        city: function($state, $stateParams, Cities) {
          return Cities.get($stateParams.city);

      }
      }
    });
  
  };
  
  export default ResultsConfig;
  