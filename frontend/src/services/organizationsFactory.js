(function () {
    'use strict';

    angular.module('HelpPlanner')
        .factory('organizations', function ($http, config) {
            const url = config.apiBase + 'organizations';

            return {
                get: () => $http.get(url).then((response) => response.data)
            };
        });

})();
