class SearchBarCtrl {
  constructor($scope){
    'ngInject';
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
