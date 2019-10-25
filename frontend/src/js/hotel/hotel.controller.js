// import marked from 'marked';

class HotelCtrl {
  constructor(hotel, User, Tags, Comments, $sce, $rootScope) {
    'ngInject';

    this.hotel = hotel;
    this._Comments = Comments;

    $rootScope.setPageTitle(this.hotel.name);

  }
}


export default HotelCtrl;