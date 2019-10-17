function ShopConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.adventure-shop', {
    url: '/adventure-shop',
    controller: 'AdventureShopCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'adventure-shop/adventure-shop.html',
    title: 'Adventures'
  });

};

export default ShopConfig;
