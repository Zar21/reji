class SuggestionsCtrl {
    constructor($scope, Cities){
      'ngInject';
      this._Cities = Cities;
      $scope.cities = "";
      this.getCities().then((cities)=>{
        $scope.cities = cities.data.cities;
      });
      $scope.selectedCountry = "";
      
      

    }
  getCities() {
      return this._Cities.getAll();
    }
  }
  
  let Suggestions= {
    // bindings: {
    //   product: '='
    // },
    transclude: true,
    controller: SuggestionsCtrl,
    templateUrl: 'components/searchbar/suggestions.html'
  };
  
  export default Suggestions;
  