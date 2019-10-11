import marked from 'marked';

class RestaurantCtrl {
  constructor(restaurant, User, Comments, $sce, $rootScope) {
    'ngInject';

    this.restaurant = restaurant;
    this._Comments = Comments;

    $rootScope.setPageTitle(this.restaurant.title);

  }
}


export default RestaurantCtrl;