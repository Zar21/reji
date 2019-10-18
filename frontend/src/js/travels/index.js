import angular from 'angular';

// Create the module where our functionality can attach to
let travelsModule = angular.module('app.travels', []);

// Include our UI-Router config settings
import TravelsConfig from './travels.config';
travelsModule.config(TravelsConfig);


// Controllers
import TravelsCtrl from './travels.controller';
travelsModule.controller('TravelsCtrl', TravelsCtrl);


export default travelsModule;
