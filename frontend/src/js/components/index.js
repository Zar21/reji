import angular from 'angular';

let componentsModule = angular.module('app.components', []);

import ListPagination from './list-pagination.component';
componentsModule.component('listPagination', ListPagination);

import ListErrors from './list-errors.component'
componentsModule.component('listErrors', ListErrors);

import ShowAuthed from './show-authed.directive';
componentsModule.directive('showAuthed', ShowAuthed);

import FollowBtn from './buttons/follow-btn.component';
componentsModule.component('followBtn', FollowBtn);

import ArticleMeta from './article-helpers/article-meta.component';
componentsModule.component('articleMeta', ArticleMeta);

import FavoriteBtn from './buttons/favorite-btn.component';
componentsModule.component('favoriteBtn', FavoriteBtn);

import ArticlePreview from './article-helpers/article-preview.component';
componentsModule.component('articlePreview', ArticlePreview);

import ArticleList from './article-helpers/article-list.component';
componentsModule.component('articleList', ArticleList);

import ProductMeta from './product-helpers/product-meta.component';
componentsModule.component('productMeta', ProductMeta);

import ProductPreview from './product-helpers/product-preview.component';
componentsModule.component('productPreview', ProductPreview);

import ProductList from './product-helpers/product-list.component';
componentsModule.component('productList', ProductList);

import RestaurantMeta from './restaurant-helpers/restaurant-meta.component';
componentsModule.component('restaurantMeta', RestaurantMeta);

import RestaurantPreview from './restaurant-helpers/restaurant-preview.component';
componentsModule.component('restaurantPreview', RestaurantPreview);

import RestaurantList from './restaurant-helpers/restaurant-list.component';
componentsModule.component('restaurantList', RestaurantList);

// hotels
import HotelsMeta from './hotels-helpers/hotels-meta.component';
componentsModule.component('hotelsMeta', HotelsMeta);

import HotelsPreview from './hotels-helpers/hotels-preview.component';
componentsModule.component('hotelsPreview', HotelsPreview);

import HotelsList from './hotels-helpers/hotels-list.component';
componentsModule.component('hotelsList', HotelsList);

// travels

import TravelMeta from './travel-helpers/travel-meta.component';
componentsModule.component('travelMeta', TravelMeta);

import TravelPreview from './travel-helpers/travel-preview.component';
componentsModule.component('travelPreview', TravelPreview);

import TravelList from './travel-helpers/travel-list.component';
componentsModule.component('travelList', TravelList);

export default componentsModule;
