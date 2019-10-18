import angular from 'angular';

// Create the module where our functionality can attach to
let resultsModule = angular.module('app.results', []);

// Include our UI-Router config settings
import ResultsConfig from './results.config';
resultsModule.config(ResultsConfig);


// Controllers
import ResultsCtrl from './results.controller';
resultsModule.controller('ResultsCtrl', ResultsCtrl);

// import ResultstActions from './results.component';
// resultsModule.component('resultsActions', ResultstActions);


export default resultsModule;
