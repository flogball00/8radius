'use strict';

angular.module('8rad', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap', 'firebase', 'ui.select'])
    .config(function ($stateProvider, $urlRouterProvider, uiSelectConfig) {
        $stateProvider.state('home', {
            url: '/',
            views: {
                '@': {
                    controller: 'WelcomeCtrl',
                    templateUrl: 'app/main/js/welcome/main.html'
                }
            }


        });
        uiSelectConfig.theme = 'bootstrap';

        $urlRouterProvider.otherwise('/');
    })
    .run(['$rootScope', 'fireAuth', function ($rootScope, fireAuth) {
        //$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
        //  console.log(error);
        //});
        //hack b/c something is off with minification and state resolves here
        $rootScope.fireAuth = fireAuth;
    }]);


