// import marked from 'marked';

class HotelsCtrl {
  constructor(hotels, User, Tags, Comments, $sce, $rootScope) {
    'ngInject';

    this.hotels = hotels;
    this._Comments = Comments;

    $rootScope.setPageTitle(this.hotels.title);

  }
}


export default HotelsCtrl;