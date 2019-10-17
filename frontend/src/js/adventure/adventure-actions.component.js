class AdventureActionsCtrl {
  constructor(Adventures, User, $state) {
    'ngInject';

    this._Adventures = Adventures;
    this._$state = $state;

  }
}

let AdventureActions = {
  bindings: {
    adventure: '='
  },
  controller: AdventureActionsCtrl,
  templateUrl: 'adventure/adventure-actions.html'
};

export default AdventureActions;
