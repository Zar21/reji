class ResultsCtrl {
  constructor(User, Comments, $sce, $rootScope, $scope, NgMap, results) {
    'ngInject';
    console.log(results);
    if (results.city != undefined) {
      this.city = results.city;
      this.hotels = results.hotelsResults;
      this.restaurants = results.restaurantsResults;
    }
    else {
      this.city = {
        name: "HOLI",
        country: {
          name: "HEY"
        },
      }
      this.hotels = results.hotels;
      this.restaurants = results.restaurants;
    }
    $rootScope.setPageTitle("Hotels in " + this.city.name);
    NgMap.getMap().then((map) => {
      this.map = map;
    });
  }
}


export default ResultsCtrl;