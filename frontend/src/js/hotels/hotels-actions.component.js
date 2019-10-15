class HotelsActionsCtrl {
  constructor(Hotels, User, $state) {
    'ngInject';

    this._Hotels = Hotels;
    this._$state = $state;

  }
}

let HotelsActions = {
  bindings: {
    hotels: '='
  },
  controller: HotelsActionsCtrl,
  templateUrl: 'hotels/hotels-actions.html'
};

export default HotelsActions;
