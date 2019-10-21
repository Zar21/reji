class ResultsCtrl {
  constructor(User, Comments, $sce, $rootScope, $scope, hotels, city) {
    'ngInject';
    $rootScope.setPageTitle("Hotels in " + city.name);
    this.hotels = hotels.hotelsResults;
    this.city = city;
  }
}


export default ResultsCtrl;