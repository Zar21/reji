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
      hotel: function(Hotels, $state, $stateParams) {
        return Hotels.get($stateParams.slug).then(
          (data) => {
            console.log(data);
            return data; 
          },
          (err) => $state.go('app.hotels')
        )
      }
    }
  });

};

export default HotelConfig;
