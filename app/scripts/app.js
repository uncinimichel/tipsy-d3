'use strict';

angular.module('graphsApp', [
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngRoute',
        'vr.directives.slider'
    ])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/main',
                controller: 'MainCtrl'
            })
            .when('/game-of-life', {
                templateUrl: 'partials/game-of-life',
                controller: 'GameOfLifeCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    });