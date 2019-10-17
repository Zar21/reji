import angular from 'angular';

// Create the module where our functionality can attach to
let adventureModule = angular.module('app.adventure', []);

// Include our UI-Router config settings
import AdventureConfig from './adventure.config';
adventureModule.config(AdventureConfig);


// Controllers
import AdventureCtrl from './adventure.controller';
adventureModule.controller('AdventureCtrl', AdventureCtrl);

import AdventureActions from './adventure-actions.component';
adventureModule.component('adventureActions', AdventureActions);


export default adventureModule;
