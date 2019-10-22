class ResultsCtrl {
  constructor(User, Comments, $sce, $rootScope, $scope, hotels, restaurants, city, NgMap) {
    'ngInject';
    $rootScope.setPageTitle("Hotels in " + city.name);
    this.hotels = hotels.hotelsResults;
    console.log(restaurants);
    this.restaurants = restaurants.restaurantsResults;
    this.city = city;

    NgMap.getMap().then((map) => {
      this.map = map;
    });
  }
}


export default ResultsCtrl;