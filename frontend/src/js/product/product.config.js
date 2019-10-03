function ProductConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.product', {
    url: '/product/:slug',
    controller: 'ProductCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'product/product.html',
    title: 'Product',
    resolve: {
      product: function(Products, $state, $stateParams) {
        return Products.get($stateParams.slug).then(
          (product) => product,
          (err) => $state.go('app.home')
        )
      }
    }
  });

};

export default ProductConfig;
