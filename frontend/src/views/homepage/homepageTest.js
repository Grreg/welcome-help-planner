'use strict';

describe('HomepageCtrl', function () {
    beforeEach(module('HelpPlanner'));

    var $controller;
    var $httpBackend;
    beforeEach(inject(function ($injector, _$controller_) {
        $httpBackend = $injector.get('$httpBackend');
        $controller = _$controller_;
        $httpBackend.whenGET(/assets\/views\/(.*)/).respond(200, ''); //todo: precompile angular templates
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('sets organizations to an array of organizations', function () {
        $httpBackend.expectGET('api/organizations').respond(
            [{"id":1,"name":"Dummy Organization One","slug":"dummy-one"},{"id":2,"name":"Dummy Organization Two","slug":"dummy-two"}]
        );
        var $scope = {};
        var controller = $controller('homepageCtrl', {$scope: $scope});
        $httpBackend.flush();

        expect($scope.organizations.length).toBeGreaterThan(1);
        expect($scope.organizations).toContain({id: 1, name: 'Dummy Organization One', slug: 'dummy-one'});
    });
});