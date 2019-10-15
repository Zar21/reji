function Hotels_shopConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.hotels_shop', {
    url: '/hotels_shop',
    controller: 'Hotels_shopCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'hotels_shop/hotels_shop.html',
    title: 'Hotels_shop'
  });

};

export default Hotels_shopConfig;
