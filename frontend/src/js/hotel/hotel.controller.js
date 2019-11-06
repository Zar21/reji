// import marked from 'marked';

class HotelCtrl {
  constructor(hotel, User, Tags, Comments, $sce, $rootScope) {
    'ngInject';

    this.hotel = hotel;
    this._Comments = Comments;

    this.listConfig = { 
      type: 'all',
      filters: {
        limit: 4,
        offset: 0
      }};

    $rootScope.setPageTitle(this.hotel.name);

  }
}


export default HotelCtrl;