'use strict';

angular.module('8rad', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap','firebase'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/js/welcome/main.html',
        controller: 'WelcomeCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })
;
