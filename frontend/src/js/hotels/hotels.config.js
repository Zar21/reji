function ProductConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.hotels', {
    url: '/hotels/:slug',
    controller: 'HotelsCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'hotels/hotels.html',
    title: 'Hotels',
    resolve: {
      hotel: function(Hotels, $state, $stateParams) {
        return Hotels.get($stateParams.slug).then(
          (hotel) => hotel,
          (err) => $state.go('app.home')
        )
      }
    }
  });

};

export default ProductConfig;
