import angular from 'angular';

// Create the module where our functionality can attach to
let hotelsModule = angular.module('app.hotels', []);

// Include our UI-Router config settings
import HotelConfig from './hotels.config';
hotelsModule.config(HotelConfig);


// Controllers
import ProductCtrl from './product.controller';
hotelsModule.controller('ProductCtrl', ProductCtrl);

import ProductActions from './product-actions.component';
hotelsModule.component('productActions', ProductActions);


export default hotelsModule;
