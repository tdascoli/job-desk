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

  module.directive('jobDetail', ['$translate', function($translate){
    return {
      priority: 10,
      restrict: 'A',
      scope: {
        jobDetail: '='
      },
      templateUrl: 'assets/templates/job-detail.html',
      link: function(scope, element){
        scope.showDetailContent=false;

        scope.getMultiLanguageText=function(text){
          return text[$translate.use()];
        };

        scope.showDetail=function(){
          element.addClass('visited');
          scope.showDetailContent=!scope.showDetailContent;
        };
      }
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

  module.directive('keyboard',function(){
    return {
      priority: 100,
      require : '?ngModel',
      restrict : 'C',
      link : function(scope,element,attrs,ngModelCtrl){
        // get element x/y
        var offset = element.offset();
        if(!ngModelCtrl){
          return;
        }

        element.click(function(){
          element.getkeyboard().reveal();
        });

        $(element).keyboard({
          layout : 'custom',
          customLayout: {'default':[
            '{clear} {b}',
            '7 8 9',
            '4 5 6',
            '1 2 3',
            '0 {a} {c}'
          ]},
          accepted : function(event, keyboard, el){
            var zip = el.value;
            if (zip.length<4){
              zip=scope.currentZip;
            }
            scope.setCurrentZip(zip);
          },
          canceled : function(){
            scope.setCurrentZip(scope.currentZip);
          },
          beforeVisible: function(){
            // reset error
            scope.locationError=false;
            // set keyboard x/y according to element
            $('#location_keyboard').css('top',offset.top+element.outerHeight(true));
            $('#location_keyboard').css('left',offset.left+4);
            $('#location_keyboard').css('width',element.outerWidth(true));
            // reset value
            ngModelCtrl.$setViewValue(null);
            ngModelCtrl.$render();
          },
          maxLength: 4,
          restrictInput : true, // Prevent keys not in the displayed keyboard from being typed in
          preventPaste : true,  // prevent ctrl-v and right click
          autoAccept : false,
          usePreview: false,
          stayOpen : true
        });
      }
    };
  });

  module.directive('formAlert', ['$compile',function($compile){
    return {
      priority: 5,
      restrict: 'A',
      link: function(scope, element, attrs){
        var trigger = attrs.formAlertTrigger || true;
        var severity = attrs.alertSeverity || "info";
        var dismissable = attrs.alertDismissable || false;
        var dismissableText = attrs.alertDismissableText || false;
        var alert=angular.element('<alert ng-show="'+trigger+'" alert-severity="'+severity+'" alert-dismissable="'+dismissable+'"><strong translate="'+attrs.formAlert+'"></strong></alert>');
        if (dismissableText){
          alert.attr('alert-dismissable-text',dismissableText);
        }
        alert.addClass('form-alert');
        $compile(alert)(scope);
        element.after(alert);
      }
    };
  }]);

  module.directive('alertDismissableOnTimeout', ['$timeout', function($timeout){
    return {
      priority: 20,
      restrict: 'A',
      link: function(scope, element, attrs){
        var dismissTimeout = attrs.alertDismissableOnTimeout || 5000;
        var alertTrigger = attrs.alertDismissableTrigger || false;

          scope.$watch(alertTrigger, function () {
            if (scope[alertTrigger]) {
              scope.timer = $timeout(function () {
                  scope[alertTrigger] = false;
              }, dismissTimeout);
            }
            else {
              $timeout.cancel(scope.timer);
            }
          });
      }
    }
  }]);

}());



