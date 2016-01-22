'use strict';

describe('HomepageCtrl', function () {
    var mockData =
        [{"id":1,"name":"Dummy Organization One","slug":"dummy-one","description":"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.","logoUrl":"https:\/\/placehold.it\/150x150?text=One","address":"Teststr. 11, 87654 Bielefeld, Deutschland"},{"id":2,"name":"Dummy Organization Two","slug":"dummy-two","description":"Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.","logoUrl":"https:\/\/placehold.it\/150x150?text=Two","address":"Teststr. 11, 87654 Bielefeld, Deutschland"}];

    beforeEach(module('HelpPlanner'));

    var $controller;
    var $httpBackend;
    beforeEach(inject(function ($injector, _$controller_) {
        $httpBackend = $injector.get('$httpBackend');
        $controller = _$controller_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('sets organizations to an array of organizations', function () {
        $httpBackend.expectGET('api/organizations/').respond(mockData);
        var $scope = {};
        var controller = $controller('homepageCtrl', {$scope: $scope});
        $httpBackend.flush();

        expect($scope.organizations.length).toBe(2);
        expect($scope.organizations).toContain(mockData[0]);
    });
});