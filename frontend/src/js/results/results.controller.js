class ResultsCtrl {
  constructor(results, User, Comments, $sce, $rootScope) {
    'ngInject';

    this.results = results;
    this._Comments = Comments;

    $rootScope.setPageTitle(this.results.title);

  }
}


export default ResultsCtrl;