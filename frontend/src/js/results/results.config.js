function ResultsConfig($stateProvider) {
    'ngInject';
  
    $stateProvider
    .state('app.results', {
      url: '/results/:city/:input/:output',
      controller: 'ResultsCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'results/results.html',
      title: 'Results',
      resolve: {
        results: function($state, $stateParams) {
            console.log($stateParams);
            return "";
        //   return Results.get($stateParams.slug).then(
        //     (results) => results,
        //     (err) => $state.go('app.home')
        //   )

        }
      }
    });
  
  };
  
  export default ResultsConfig;
  