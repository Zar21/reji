function AdventureConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.adventure', {
    url: '/adventure/:slug',
    controller: 'AdventureCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'adventure/adventure.html',
    title: 'Adventure',
    resolve: {
      adventure: function(Adventures, $state, $stateParams) {
        return Adventures.get($stateParams.slug).then(
          (adventure) => adventure,
          (err) => $state.go('app.adventure-shop')
        )
      }
    }
  });

};

export default AdventureConfig;
