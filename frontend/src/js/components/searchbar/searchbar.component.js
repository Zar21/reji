class SearchBarCtrl {
  constructor($scope){
    'ngInject';
    console.log(this.hero);
  }
  
}


let SearchBar= {
  // bindings: {
  //   product: '='
  // },
  transclude: true,
  templateUrl: 'components/searchbar/searchbar.html'
};

export default SearchBar;
