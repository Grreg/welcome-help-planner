(function () {
    'use strict';

    angular.module('HelpPlanner')
        .factory('organizations', function ($http, config) {
            const baseUrl = config.apiBase + 'organizations/';

            return {
                findAll: () => $http.get(baseUrl).then((response) => response.data),
                findBySlug: (slug) => $http.get(baseUrl + slug).then((response) => response.data)
            };
        });

})();
