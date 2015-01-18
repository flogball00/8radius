'use strict';

angular.module('8rad', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap', 'firebase', 'ui.select'])
    .config(function ($stateProvider, $urlRouterProvider, uiSelectConfig) {
        $stateProvider.state('home', {
            url: '/',
            views: {
                '@': {
                    controller: 'WelcomeCtrl',
                    templateUrl: 'app/main/js/welcome/welcome.html'
                }
            },
            onExit: function(myFirebase, $rootScope){
                var rootUser = myFirebase.getCurrentNGUser($rootScope.userId);
                rootUser.$bindTo($rootScope, 'currentUser')
            }


        });
        uiSelectConfig.theme = 'bootstrap';

        $urlRouterProvider.otherwise('/');
    })
    .run(['$rootScope', '$state', 'fireAuth', function ($rootScope, $state, fireAuth) {

        $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
            // We can catch the error thrown when the $requireAuth promise is rejected
            // and redirect the user back to the home page
            if (error === "AUTH_REQUIRED") {
                $rootScope.$broadcast('AUTH_REQUIRED', 'auth_required_data');
                $state.go("home");
            }
        });
    }]);


