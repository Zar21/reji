class HotelActionsCtrl {
  constructor(User, $state) {
    'ngInject';

    this._$state = $state;

  }
}

let HotelActions = {
  bindings: {
    hotel: '='
  },
  controller: HotelActionsCtrl,
  templateUrl: 'hotel/hotel-actions.html'
};

export default HotelActions;
