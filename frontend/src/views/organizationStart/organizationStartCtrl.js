(function () {
    'use strict';

    angular.module('HelpPlanner')
        .controller('organizationStartCtrl', function ($scope, $state, $stateParams, organizations) {
            organizations.findBySlug($stateParams.organization)
                .then(
                    (organization) => $scope.organization = organization,
                    function () {
                        $state.go('notfound');
                    });
        });
})();