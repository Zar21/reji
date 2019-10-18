function TravelsConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.travels', {
    url: '/travels',
    controller: 'TravelsCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'travels/travels.html',
    title: 'Travels'
  });

};

export default TravelsConfig;
