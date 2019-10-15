function HotelsConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.hotels', {
    url: '/hotels/:slug',
    controller: 'HotelsCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'hotels/hotels.html',
    title: 'Hotels',
    resolve: {
      hotels: function(Hotels, $state, $stateParams) {
        return Hotels.get($stateParams.slug).then(
          (hotels) => hotels,
          (err) => $state.go('app.hotels_shop')
        )
      }
    }
  });

};

export default HotelsConfig;
