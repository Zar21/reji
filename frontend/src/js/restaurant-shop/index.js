import angular from 'angular';

// Create the module where our functionality can attach to
let restaurantShopModule = angular.module('app.restaurantshop', []);

// Include our UI-Router config settings
import RestaurantShopConfig from './restaurantshop.config';
restaurantShopModule.config(RestaurantShopConfig);


// Controllers
import RestaurantShopCtrl from './restaurantshop.controller';
restaurantShopModule.controller('RestaurantShopCtrl', RestaurantShopCtrl);


export default restaurantShopModule;
