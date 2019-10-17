class HotelActionsCtrl {
  constructor(Hotel, User, $state) {
    'ngInject';

    this._Hotel = Hotel;
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
