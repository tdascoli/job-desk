;(function () {

  'use strict';

  angular.module('job-desk')
    .factory('ConfigService', function ($cookies) {

      var config = {
        address:'',
        zip:undefined,
        coords:undefined,
        educations:true,
        apprenticeships:true,
        localInfo:'',
        showMunicipalities:true
      };

      function init(){
        var cookieConfig = $cookies.getObject('config');
        if (cookieConfig){
          config = cookieConfig;
        }
        return config;
      }

      function persist(){
        var now = new Date();
        $cookies.remove('config');
        $cookies.putObject('config',config,{expires:new Date(now.getFullYear()+10,now.getMonth())});
      }

      return {
        init: init,
        config: config,
        persist: persist
      };

    });

}());



