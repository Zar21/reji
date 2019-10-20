class ResultsCtrl {
  constructor(User, Comments, $sce, $rootScope, $scope, hotels, city) {
    'ngInject';
    $rootScope.setPageTitle("Hotels in " + city.name);

    this.hotels = hotels.data.hotels;
    this.city = city;

    console.log(city);
    

  }
}


export default ResultsCtrl;