;(function () {

  'use strict';

  var module = angular.module('job-desk');

  module.directive('localInfo', function(){
    return {
      priority: 10,
      restrict: 'C',
      link: function (scope, element) {
        //** height
        element.css('height', ( $(window).height() - $('#topnav').outerHeight(true)) );
      }
    };
  });
}());
