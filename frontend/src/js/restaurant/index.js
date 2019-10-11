import angular from 'angular';

// Create the module where our functionality can attach to
let restaurantModule = angular.module('app.restaurant', []);

// Include our UI-Router config settings
import RestaurantConfig from './restaurant.config';
restaurantModule.config(RestaurantConfig);


// Controllers
import RestaurantCtrl from './restaurant.controller';
restaurantModule.controller('RestaurantCtrl', RestaurantCtrl);

import RestaurantActions from './restaurant-actions.component';
restaurantModule.component('restaurantActions', RestaurantActions);


export default restaurantModule;
