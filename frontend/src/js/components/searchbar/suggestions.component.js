class SuggestionsCtrl {
    constructor($scope, Cities){
      'ngInject';
      $scope.cities = "";
      // getcities
      Cities.getAll().then((cities)=>{
        $scope.cities = cities.data.cities;
      });
      $scope.selectedCity = "";

    }
    inputChanged(){
      console.log(this.$parent.$index);
      
    }
  }
  
  let Suggestions= {
    // bindings: {
    //   city: '='
    // },
    transclude: true,
    controller: SuggestionsCtrl,
    templateUrl: 'components/searchbar/suggestions.html'
  };
  
  export default Suggestions;
  