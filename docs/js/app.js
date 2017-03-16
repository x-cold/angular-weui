/**
 * @name app.js
 * @description ui-router路由配置
 * @author xcold
 * @date 2016/4/4
 */

define(['angular'], function(angular) {
  'use strict';

  var app = angular.module('myApp', ['ui.router']);
  app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/');
      $stateProvider
      /**
       * home
       */
        .state('home', {
        url: '/',
        templateUrl: 'templates/widget/home.html'
      })

      /**
       * button
       */
      .state('button', {
        url: '/button',
        templateUrl: 'templates/widget/button.html'
      })

      /**
       * cell
       */
      .state('cell', {
        url: '/cell',
        templateUrl: 'templates/widget/cell.html'
      })

      /**
       * toast
       */
      .state('toast', {
        url: '/toast',
        templateUrl: 'templates/widget/toast.html',
        controller: 'toastController'
      })

      /**
       * dialog
       */
      .state('dialog', {
        url: '/dialog',
        templateUrl: 'templates/widget/dialog.html',
        controller: 'dialogController'
      })

      /**
       * progress
       */
      .state('progress', {
        url: '/progress',
        templateUrl: 'templates/widget/progress.html'
      })

      /**
       * msg
       */
      .state('msg', {
        url: '/msg',
        templateUrl: 'templates/widget/msg.html'
      })

      /**
       * article
       */
      .state('article', {
        url: '/article',
        templateUrl: 'templates/widget/article.html'
      })

      /**
       * actionSheet
       */
      .state('actionSheet', {
        url: '/actionSheet',
        templateUrl: 'templates/widget/actionSheet.html'
      })

      /**
       * icons
       */
      .state('icons', {
        url: '/icons',
        templateUrl: 'templates/widget/icons.html'
      })

      /**
       * panel
       */
      .state('panel', {
        url: '/panel',
        templateUrl: 'templates/widget/panel.html'
      })

      /**
       * tab
       */
      .state('tab', {
        url: '/tab',
        templateUrl: 'templates/widget/tab.html'
      })

      /**
       * searchBar
       */
      .state('searchBar', {
        url: '/searchBar',
        templateUrl: 'templates/widget/searchBar.html'
      })
    }
  ]);
});
