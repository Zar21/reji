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
          /*return Hotels.get($stateParams.slug).then(
            (results) => results,
            (err) => $state.go('app.home')
          )*/
          return "";

        },
        city: function($state, $stateParams, Cities) {
          console.log($stateParams);
          return Cities.get($stateParams.city);
        // return Hotels.get($stateParams.slug).then(
        //   (results) => results,
        //   (err) => $state.go('app.home')
        // )

      }
      }
    });
  
  };
  
  export default ResultsConfig;
  