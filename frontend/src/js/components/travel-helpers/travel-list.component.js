class TravelListCtrl {
  constructor(Travels, $scope) {
    'ngInject';

    this._Travels = Travels;
    this.getAll();
    //this.setListTo(this.listConfig);

    //Pagination will be implemented when we install the prisma server
    /*$scope.$on('setListTo', (ev, newList) => {
      this.setListTo(newList);
    });

    $scope.$on('setPageTo', (ev, pageNumber) => {
      this.setPageTo(pageNumber);
    });*/

  }

  getAll() {
    this.loading = true;
    this._Travels
      .getAll()
      .then(
        (res) => {
          console.log(res);
          this.loading = false;

          // Update list and total pages
          this.list = res.data.travels;

          //this.listConfig.totalPages = Math.ceil(res.productsCount / this.limit);
        }
      );
  }

  /*setListTo(newList) {
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
    //queryConfig.filters.offset = (this.limit * (this.listConfig.currentPage - 1));
    queryConfig.filters.offset = 0;

    // Run the query
    this._Products
      .query(queryConfig)
      .then(
        (res) => {
          this.loading = false;

          // Update list and total pages
          this.list = res.products;

          this.listConfig.totalPages = Math.ceil(res.productsCount / this.limit);
        }
      );
  }*/

}

let TravelList = {
  bindings: {
    limit: '=',
    listConfig: '='
  },
  controller: TravelListCtrl,
  templateUrl: 'components/travel-helpers/travel-list.html'
};

export default TravelList;
