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


export default componentsModule;
