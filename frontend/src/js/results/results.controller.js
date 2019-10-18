class ResultsCtrl {
  constructor(User, Comments, $sce, $rootScope, hotels, city) {
    'ngInject';
    this._Comments = Comments;
    this.hotels = hotels;
    $rootScope.setPageTitle("Hola");
    console.log(hotels);
    console.log(city);
  }
}


export default ResultsCtrl;