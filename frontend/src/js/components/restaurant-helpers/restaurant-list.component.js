class RestaurantListCtrl {
  constructor(Restaurants, $scope) {
    'ngInject';

    this._Restaurants = Restaurants;

    $scope.$watch('this.listConfig.filters', (filters) => {
      this.setListTo(this.listConfig);
    })

    $scope.$watch('this.currentData', () => {
      this.runQuery();
    })

    $scope.$on('setListTo', (ev, newList) => {
      this.setListTo(newList);
    });

    $scope.$on('setPageTo', (ev, pageNumber) => {
      this.setPageTo(pageNumber);
    });

  }

  setListTo(newList) {
    // Set the current list to an empty array
    this.list = [];

    // Set listConfig to the new list's config
    this.listConfig = newList;

    this.runQuery();
  }

  setPageTo(pageNumber) {
    this.listConfig.currentPage = pageNumber;

    this.runQuery();
  }


 runQuery() {
    // Show the loading indicator
    this.loading = true;
    this.listConfig = this.listConfig || {};

    // Create an object for this query
    let queryConfig = {
      type: this.listConfig.type || undefined,
      filters: this.listConfig.filters || {}
    };

    // Set the limit filter from the component's attribute
    queryConfig.filters.limit = this.limit;

    // If there is no page set, set page as 1
    if (!this.listConfig.currentPage) {
      this.listConfig.currentPage = 1;
    }

    // Add the offset filter
    queryConfig.filters.offset = (this.limit * (this.listConfig.currentPage - 1));

    // if we pass the component data we already have
    if (this.currentData) {
      this.loading = false;
      
      // Update list and total pages with existing data
      this.list = this.currentData;
      
      this.listConfig.totalPages = Math.ceil(this.currentData.length / this.limit);
    } else {
      
      // Run the query
      this._Restaurants
        .query(queryConfig)
        .then(
          (res) => {
            this.loading = false;
  
            // Update list and total pages
            this.list = res.restaurants;
            this.listConfig.totalPages = Math.ceil(res.restaurantsCount / this.limit);
          }
        );
    }
  }

}

let RestaurantList = {
  bindings: {
    limit: '=',
    listConfig: '=',
    currentData: '='
  },
  controller: RestaurantListCtrl,
  templateUrl: 'components/restaurant-helpers/restaurant-list.html'
};

export default RestaurantList;
