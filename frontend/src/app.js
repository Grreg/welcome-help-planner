(function () {
    'use strict';

    angular.module('HelpPlanner', ['templates', 'ui.router', 'ui.validate', 'ui.bootstrap'])
    .config(function config ($locationProvider, $urlRouterProvider, $stateProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/notfound');

        $stateProvider
            .state('notfound', {
                url: '/notfound',
                templateUrl: 'assets/views/notfound/notfound.html'
            })
            .state('homepage', {
                url: '/',
                templateUrl: 'assets/views/homepage/homepage.html',
                controller: 'homepageCtrl'
            })
            .state('organizationStart', {
                url: '/:organization/',
                templateUrl: 'assets/views/organizationStart/organizationStart.html',
                controller: 'organizationStartCtrl'
            });
    })

    .run(function run ($rootScope, $state) {
        $rootScope.$state = $state;
    })

    .constant('config', {
        apiBase: 'api/'
    });

})();
