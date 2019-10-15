import angular from 'angular';

// Create the module where our functionality can attach to
let hotels_shopModule = angular.module('app.hotels_shop', []);

// Include our UI-Router config settings
import Hotels_shopConfig from './hotels_shop.config';
hotels_shopModule.config(Hotels_shopConfig);


// Controllers
import Hotels_shopCtrl from './hotels_shop.controller';
hotels_shopModule.controller('Hotels_shopCtrl', Hotels_shopCtrl);


export default hotels_shopModule;
