class RestaurantActionsCtrl {
  constructor(Restaurants, User, $state) {
    'ngInject';

    this._Restaurants = Restaurants;
    this._$state = $state;

  }
}

let RestaurantActions = {
  bindings: {
    restaurant: '='
  },
  controller: RestaurantActionsCtrl,
  templateUrl: 'restaurant/restaurant-actions.html'
};

export default RestaurantActions;
