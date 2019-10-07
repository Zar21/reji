import marked from 'marked';

class ProductCtrl {
  constructor(product, User, Comments, $sce, $rootScope) {
    'ngInject';

    this.product = product;
    this._Comments = Comments;

    this.currentUser = User.current;

    $rootScope.setPageTitle(this.product.title);
    console.log(this.product);
    this.product.body = $sce.trustAsHtml(marked(this.product.title, { sanitize: true }));
    //this.product.image = $sce.trustAsHtml(marked(this.product.image, { sanitize: true }));

  }
}


export default ProductCtrl;
