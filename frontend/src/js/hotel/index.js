import angular from 'angular';

// Create the module where our functionality can attach to
let hotelModule = angular.module('app.hotel', []);

// Include our UI-Router config settings
import HotelConfig from './hotel.config';
hotelModule.config(HotelConfig);


// Controllers
import HotelCtrl from './hotel.controller';
hotelModule.controller('HotelCtrl', HotelCtrl);

import HotelActions from './hotel-actions.component';
hotelModule.component('hotelActions', HotelActions);


export default hotelModule;
