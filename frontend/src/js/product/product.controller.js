import marked from 'marked';

class ProductCtrl {
  constructor(product, User, Comments, $sce, $rootScope) {
    'ngInject';

    this.product = product;
    this._Comments = Comments;

    $rootScope.setPageTitle(this.product.title);

  }
}


export default ProductCtrl;