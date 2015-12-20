(function () {
    'use strict';

    angular.module('HelpPlanner', ['ui.router', 'ui.validate'])
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
                templateUrl: 'assets/views/homepage/homepage.html'
            });
    })

    .run(function run ($rootScope, $state) {
        $rootScope.$state = $state;
    });

})();
