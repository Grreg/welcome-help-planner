(function () {
    'use strict';

    angular.module('HelpPlanner')
        .controller('homepageCtrl', function ($scope, organizations) {
            organizations.get().then((organizations) =>
                $scope.organizations = organizations
            );
        });

})();
