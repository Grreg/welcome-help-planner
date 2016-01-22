(function () {
    'use strict';

    angular.module('HelpPlanner')
        .controller('homepageCtrl', function ($scope, organizations) {
            organizations.findAll().then((organizations) =>
                $scope.organizations = organizations
            );
        });

})();
