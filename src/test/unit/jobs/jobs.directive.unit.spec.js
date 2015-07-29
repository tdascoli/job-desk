;(function () {

    describe("job-desk", function() {

      beforeEach(angular.mock.module('job-desk'));

      describe("jobs.directive", function() {
        var $compile;
        var $scope;
        var $httpBackend;
        var elem;

        // Angular strips the underscores when injecting
        beforeEach(inject(function(_$compile_, _$rootScope_,_$httpBackend_) {
            $compile = _$compile_;
            $scope = _$rootScope_.$new();
            $httpBackend=_$httpBackend_;
            elem  = angular.element('<div><help></help></div>');
            $compile(elem)($scope);
            $scope.$digest();
        }));

        it('help directive - renders the element as required',
          inject(function(){
            console.log(elem.html());
            expect(elem.hasClass('.example')).toBeTruthy();
          })
        );
      });

    });

}());
