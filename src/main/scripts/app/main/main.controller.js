'use strict';

angular.module('job-desk')
    .controller('MainController', function ($scope, Principal) {

    $scope.account = Principal.getIdentity();
    $scope.isAuthenticated = Principal.isAuthenticated;

    });
