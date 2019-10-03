function ShopConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.shop', {
    url: '/shop',
    controller: 'ShopCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'shop/shop.html',
    title: 'Shop'
  });

};

export default ShopConfig;
