;(function () {

  'use strict';

  angular.module('job-desk')
    .factory('PresenceService', function ($presence, $state, $rootScope) {

      var userActive = {active: true};
      var timeoutInactive = 1;  // minutes
      var timeoutReset = 1.5;     // minutes

      var states = $presence.init({
        ACTIVE: 0,
        INACTIVE: timeoutInactive * 60 * 1000,
        RESET: {
          enter: timeoutReset * 60 * 1000,
          initial: true
        }
      });

      // controllers have to catch broadcast to reset their search params
      states.RESET.onEnter(function () {
        userActive.active = true;
        $rootScope.$broadcast('resetSearchParams');
        $state.go('jobs');
      });

      states.INACTIVE.onEnter(function () {
        // no sleep screen when state is on 'job'
        if (!$state.is('jobs')) {
          userActive.active = false;
        }
      });

      states.ACTIVE.onEnter(function () {
        userActive.active = true;
      });

      return {
        userActive: userActive
      };
    });
}());



