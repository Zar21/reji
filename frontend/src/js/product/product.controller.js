import marked from 'marked';

class ProductCtrl {
  constructor(Product, User, Comments, $sce, $rootScope) {
    'ngInject';

    this.product = Product;
    this._Comments = Comments;

    this.currentUser = User.current;

    $rootScope.setPageTitle(this.product.title);

    this.product.body = $sce.trustAsHtml(marked(this.product.body, { sanitize: true }));

    Comments.getAll(this.product.slug).then(
      (comments) => this.comments = comments
    );

    this.resetCommentForm();
  }
}


export default ProductCtrl;
