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
        templateUrl: 'widget/home.html'
      })

      /**
       * button
       */
      .state('button', {
        url: '/button',
        templateUrl: 'widget/button.html'
      })

      /**
       * cell
       */
      .state('cell', {
        url: '/cell',
        templateUrl: 'widget/cell.html'
      })

      /**
       * toast
       */
      .state('toast', {
        url: '/toast',
        templateUrl: 'widget/toast.html',
        controller: 'toastController'
      })

      /**
       * dialog
       */
      .state('dialog', {
        url: '/dialog',
        templateUrl: 'widget/dialog.html',
        controller: 'dialogController'
      })

      /**
       * progress
       */
      .state('progress', {
        url: '/progress',
        templateUrl: 'widget/progress.html'
      })

      /**
       * msg
       */
      .state('msg', {
        url: '/msg',
        templateUrl: 'widget/msg.html'
      })

      /**
       * article
       */
      .state('article', {
        url: '/article',
        templateUrl: 'widget/article.html'
      })

      /**
       * actionSheet
       */
      .state('actionSheet', {
        url: '/actionSheet',
        templateUrl: 'widget/actionSheet.html'
      })

      /**
       * icons
       */
      .state('icons', {
        url: '/icons',
        templateUrl: 'widget/icons.html'
      })

      /**
       * panel
       */
      .state('panel', {
        url: '/panel',
        templateUrl: 'widget/panel.html'
      })

      /**
       * tab
       */
      .state('tab', {
        url: '/tab',
        templateUrl: 'widget/tab.html'
      })

      /**
       * searchBar
       */
      .state('searchBar', {
        url: '/searchBar',
        templateUrl: 'widget/searchBar.html'
      })
    }
  ]);
});