;(function () {

  'use strict';

  angular.module('job-desk')
    .factory('UpdateService', function ($window, $interval, $mdToast, $http, $q, $translate) {

      var updateDelay = 60000;
      var toastHideDelay = 0;
      var lastUpdate;

      function init() {

        getLastUpdate().then(function (timestamp) {
          lastUpdate = timestamp;
        });

        $interval(function () {
          getLastUpdate().then(function (timestamp) {
            if (timestamp !== lastUpdate) {
              lastUpdate = timestamp;
              showUpdateToast();
            }
          });
        }, updateDelay);
      }

      function getLastUpdate() {
        return $q(function (resolve, reject) {
          $http({
            method: 'GET',
            url: '/update.json'
          }).then(function successCallback(response) {
            resolve(response.data.timestamp);
          }, function errorCallback(response) {
            // todo trackjs
            console.log(response);
            reject();
          });
        });
      }

      function showUpdateToast() {
        var toast = $mdToast.simple()
          .content($translate.instant('messages.update.information'))
          .action($translate.instant('messages.update.action'))
          .hideDelay(toastHideDelay)
          .position('top right');
        $mdToast.show(toast).then(function (response) {
          if (response === 'ok') {
            $window.location.reload();
          }
        });
      }

      return {
        init: init
      };
    });
}());



