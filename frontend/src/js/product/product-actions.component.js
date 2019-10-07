class ProductActionsCtrl {
  constructor(Products, User, $state) {
    'ngInject';

    this._Products = Products;
    this._$state = $state;

  }
}

let ProductActions = {
  bindings: {
    product: '='
  },
  controller: ProductActionsCtrl,
  templateUrl: 'product/product-actions.html'
};

export default ProductActions;
