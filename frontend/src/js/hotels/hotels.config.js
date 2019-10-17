function HotelsConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.hotels', {
    url: '/hotels',
    controller: 'HotelsCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'hotels/hotels.html',
    title: 'Hotels'
  });

};

export default HotelsConfig;
