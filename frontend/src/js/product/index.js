import angular from 'angular';

// Create the module where our functionality can attach to
let productModule = angular.module('app.product', []);

// Include our UI-Router config settings
import ProductConfig from './product.config';
productModule.config(ProductConfig);


// Controllers
import ProductCtrl from './product.controller';
productModule.controller('ProductCtrl', ProductCtrl);

import ProductActions from './product-actions.component';
productModule.component('productActions', ProductActions);


export default productModule;
