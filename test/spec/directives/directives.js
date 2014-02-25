'use strict';

describe('Directives Game of life', function () {
    var $compile,
        $rootScope;

    // load the controller's module
    beforeEach(module('graphsApp'));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function (_$compile_, _$rootScope_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('Should ', function () {
        // Compile a piece of HTML containing the directive
        var element = $compile("<div d3GameOfLife ng-model='data' rows='10' cols='10'></div>")($rootScope);
        // fire all the watches, so the scope expression {{1 + 1}} will be evaluated
        $rootScope.$digest();
        // Check that the compiled element contains the templated content
        expect(element.html()).toContain("lidless, wreathed in flame, 2 times");
    });
});
