import marked from 'marked';

class AdventureCtrl {
  constructor(adventure, User, Comments, $sce, $rootScope) {
    'ngInject';

    this.adventure = adventure;
    this._Comments = Comments;

    $rootScope.setPageTitle(this.adventure.title);

  }
}


export default AdventureCtrl;