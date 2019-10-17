import angular from 'angular';

// Create the module where our functionality can attach to
let servicesModule = angular.module('app.services', []);


import UserService from './user.service';
servicesModule.service('User', UserService);

import JwtService from './jwt.service'
servicesModule.service('JWT', JwtService);

import ProfileService from './profile.service';
servicesModule.service('Profile', ProfileService);

import ArticlesService from './articles.service';
servicesModule.service('Articles', ArticlesService);

import CommentsService from './comments.service';
servicesModule.service('Comments', CommentsService);

import TagsService from './tags.service';
servicesModule.service('Tags', TagsService);

import ContactService from './contact.service';
servicesModule.service('Contact', ContactService);

import ProductsService from './products.service';
servicesModule.service('Products', ProductsService);

import RestaurantsService from './restaurant.service';
servicesModule.service('Restaurants', RestaurantsService);

import TravelsService from './travels.service';
servicesModule.service('Travels', TravelsService);

import HotelsService from './hotels.service';
servicesModule.service('Hotels', HotelsService);

export default servicesModule;
