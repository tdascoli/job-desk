;(function () {

    describe("job-desk - app", function() {

      beforeEach(module('job-desk','stateMock', function($translateProvider, $provide){
        $provide.constant('supportedLanguages',['de', 'en']);
        $translateProvider.preferredLanguage('en');
      }));

      describe("rootScope.back function", function() {
        var $scope;
        var elem;

        beforeEach(inject(function($compile,$rootScope,$state) {
          state = $state;
          $scope = $rootScope.$new();
          $scope.$apply();

          elem  = angular.element('<div><button id="back-id" ng-click="back()">back-button</button></div>');
          $compile(elem)($scope);
          $scope.$apply();
        }));

        it('renders the element as required',
          inject(function(){

            console.log(elem.html());

            $scope.back();
            $scope.$apply();


          })
        );
      });

    });

}());
