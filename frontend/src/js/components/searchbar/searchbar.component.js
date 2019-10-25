class SearchBarCtrl {
  constructor(Cities){
    'ngInject';
    this.cities = "";
    // getcities
    Cities.getAll().then((cities)=>{
      
      this.cities = cities.cities;
      console.log(this.cities);
    });
    this.selectedCity = "";

  }
}
let SearchBar= {
  // bindings: {
  //   product: '='
  // },
  transclude: true,
  controller: SearchBarCtrl,
  templateUrl: 'components/searchbar/searchbar.html'
};

export default SearchBar;
