class ProductActionsCtrl {
  constructor(Products, User, $state) {
    'ngInject';

    this._Products = Products;
    this._$state = $state;

    if (User.current) {
      this.canModify = (User.current.username === this.product.author.username);
    } else {
      this.canModify = false;
    }

  }

  deleteProduct() {
    this.isDeleting = true;
    this._Products.destroy(this.product.slug).then(
      (success) => this._$state.go('app.home'),
      (err) => this._$state.go('app.home')
    )
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
