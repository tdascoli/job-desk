;(function() {

  'use strict';

  var module = angular.module('job-desk');

  module.directive('help', function(){
    return {
      priority: 10,
      restrict: 'E',
      replace: true,
      templateUrl: 'assets/templates/help.html',
      link: function(scope, element){
        element.addClass('example');

      }
    };
  });

  module.directive('categoryGroup', ['$window', function($window){
    return {
      priority: 10,
      restrict: 'C',
      link: function(scope, element){
        var height = ($window.innerHeight / 5) - 20;
        element.css('height',height);

        scope.$on('$viewContentLoaded' ,function(){
          height = ($window.innerHeight / 5) - 20;
          element.css('height',height);
        });

        $($window).resize(function(){
          height = ($window.innerHeight / 5) - 20;
          element.css('height',height);
        });
      }
    };
  }]);

  module.directive('jobResults', ['$window', function($window){
    return {
      priority: 10,
      restrict: 'C',
      link: function(scope, element){
        var filter = $('#filter').outerHeight(true) || 0;
        var bottom = $('#navbottom').outerHeight(true) || 0;
        var topnav = $('#topnav').outerHeight(true) || 0;
        var height = $window.innerHeight - (filter+bottom+topnav);
        element.css('height',height);

        scope.$on('$viewContentLoaded' ,function(){
          filter = $('#filter').outerHeight(true) || 0;
          bottom = $('#navbottom').outerHeight(true) || 0;
          topnav = $('#topnav').outerHeight(true) || 0;
          height = $window.innerHeight - (filter+bottom+topnav);
          element.css('height',height);
        });

        $($window).resize(function(){
          filter = $('#filter').outerHeight(true) || 0;
          bottom = $('#navbottom').outerHeight(true) || 0;
          topnav = $('#topnav').outerHeight(true) || 0;
          height = $window.innerHeight - (filter+bottom+topnav);
          element.css('height',height);
        });
      }
    };
  }]);

  module.directive('jobDetail', [function(){
    return {
      priority: 10,
      restrict: 'A',
      scope: {
        jobDetail: '='
      },
      templateUrl: 'assets/templates/job-detail.html'
    };
  }]);

  module.directive('navigation', ['$window', function($window){
    return {
      priority: 10,
      restrict: 'C',
      link: function(scope, element){
        var height = ($window.innerHeight / 5)/2;
        element.css('height',height);

        scope.$on('$viewContentLoaded' ,function(){
          height = ($window.innerHeight / 5)/2;
          element.css('height',height);
        });

        $($window).resize(function(){
          height = ($window.innerHeight / 5)/2;
          element.css('height',height);
        });
      }
    };
  }]);


}());



