import angular from 'angular';

// Create the module where our functionality can attach to
let adventureShopModule = angular.module('app.adventure-shop', []);

// Include our UI-Router config settings
import AdventureShopConfig from './adventure-shop.config';
adventureShopModule.config(AdventureShopConfig);


// Controllers
import AdventureShopCtrl from './adventure-shop.controller';
adventureShopModule.controller('AdventureShopCtrl', AdventureShopCtrl);


export default adventureShopModule;
