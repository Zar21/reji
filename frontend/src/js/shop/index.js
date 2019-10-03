import angular from 'angular';

// Create the module where our functionality can attach to
let shopModule = angular.module('app.shop', []);

// Include our UI-Router config settings
import ShopConfig from './shop.config';
shopModule.config(ShopConfig);


// Controllers
import ShopCtrl from './shop.controller';
shopModule.controller('ShopCtrl', ShopCtrl);


export default shopModule;
