;(function() {

  'use strict';

  var module = angular.module('job-desk');

  module.directive('help', function(){
    return {
      priority: 10,
      restrict: 'E',
      replace: true,
      templateUrl: 'template/help.html',
      link: function(scope, element){
        element.addClass('example');

      }
    };
  });

  module.directive('jobDetail', ['$translate','$sce', function($translate,$sce){
    return {
      priority: 10,
      restrict: 'A',
      scope: {
        jobDetail: '='
      },
      templateUrl: 'template/job-detail.html',
      link: function(scope, element){
        scope.showDetailContent=false;

        scope.getMultiLanguageText=function(text){
          return text[$translate.use()];
        };

        scope.getExternalUrl=function(link){
          return $sce.trustAsResourceUrl(link);
        };

        scope.showDetail=function(){
          element.addClass('visited');
          scope.showDetailContent=!scope.showDetailContent;
        };
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
        var severity = attrs.alertSeverity || 'info';
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

}());



