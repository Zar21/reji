import angular from 'angular';

// Create the module where our functionality can attach to
let hotelsModule = angular.module('app.hotels', []);

// Include our UI-Router config settings
import HotelsConfig from './hotels.config';
hotelsModule.config(HotelsConfig);

// Controllers
import HotelsCtrl from './hotels.controller';
hotelsModule.controller('HotelsCtrl', HotelsCtrl);


export default hotelsModule;
