function HotelConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.hotel', {
    url: '/hotel/:slug',
    controller: 'HotelCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'hotel/hotel.html',
    title: 'Hotel',
    resolve: {
      hotel: function(Hotel, $state, $stateParams) {
        return Hotel.get($stateParams.slug).then(
          (hotel) => hotel,
          (err) => $state.go('app.hotels')
        )
      }
    }
  });

};

export default HotelConfig;
