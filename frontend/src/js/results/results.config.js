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
        hotels: function($state, $stateParams) {
            console.log($stateParams);
          return Hotels.get($stateParams.slug).then(
            (results) => results,
            (err) => $state.go('app.home')
          )

        },
        city: function($state, $stateParams) {
          console.log($stateParams);
        // return Hotels.get($stateParams.slug).then(
        //   (results) => results,
        //   (err) => $state.go('app.home')
        // )

      }
      }
    });
  
  };
  
  export default ResultsConfig;
  