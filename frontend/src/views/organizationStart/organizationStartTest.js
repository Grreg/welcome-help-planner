'use strict';

describe('organizationStartCtrl', function () {
    var mockData =
    {"id":1,"name":"Dummy Organization One","slug":"dummy-one","description":"Lorem ipsum dolor sit","logoUrl":"https:\/\/placehold.it\/150x150?text=One","address":"Teststr. 11, 87654 Bielefeld, Deutschland"};

    beforeEach(module('HelpPlanner'));

    var $controller;
    var $httpBackend;
    var $stateParams;
    var $state;

    beforeEach(inject(function ($injector, _$controller_, _$state_) {
        $httpBackend = $injector.get('$httpBackend');
        $stateParams = $injector.get('$stateParams');
        $controller = _$controller_;

        $state = _$state_;
        spyOn($state, 'go');
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('sets organization to the requested organization', function () {
        $stateParams.organization = 'dummy-one';
        $httpBackend.expectGET('api/organizations/dummy-one').respond(mockData);

        var $scope = {};
        $controller('organizationStartCtrl', {$scope: $scope});
        $httpBackend.flush();

        expect($scope.organization).toEqual(mockData);
    });

    it('redirects to `notfound` if the requested organization wasn\'t found', inject(function () {
        $stateParams.organization = 'dummy-nine';
        $httpBackend.expectGET('api/organizations/dummy-nine').respond(404, '');
        $controller('organizationStartCtrl', {$scope: {}, $state: $state});
        $httpBackend.flush();

        expect($state.go).toHaveBeenCalledWith('notfound');
    }));
});