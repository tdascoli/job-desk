angular.module('job-desk').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/content/apprenticeships/apprenticeships.html',
    "<div layout=\"row\" layout-wrap layout-padding layout-align=\"space-between start\" class=\"jd-categories\">\n" +
    "\n" +
    "  <div class=\"category\" flex=\"33\" flex-sm=\"100\" ng-click=\"setSwissdocGroup(swissdoc.code)\" ng-repeat=\"swissdoc in swissdocMajorGroup\">\n" +
    "    <img class=\"iscoIcon\" ng-src=\"assets/images/{{swissdoc.img}}\" alt=\"swissdoc\" />\n" +
    "    <div class=\"category-title\"><span class=\"md-title\" translate=\"{{swissdoc.text}}\"></span></div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div flex=\"33\"></div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<md-button href=\"#/apprenticeship-search\" class=\"md-fab md-primary md-fab-bottom-right jd-floating-fab\" aria-label=\"global.navigation.search\" md-theme-watch=\"true\">\n" +
    "  <md-icon>arrow_forward</md-icon>\n" +
    "</md-button>\n"
  );


  $templateCache.put('views/content/apprenticeships/result.html',
    "<div id=\"filter\" layout=\"row\" layout-margin layout-padding layout-align=\"space-between center\" class=\"md-whiteframe-z2 jd-floating-toolbar\">\n" +
    "  <div flex=\"25\" flex-sm=\"100\">\n" +
    "    <md-input-container class=\"md-select-has-label\">\n" +
    "      <label translate=\"apprenticeships.result.sorting\"></label>\n" +
    "      <md-select ng-model=\"sort\" ng-change=\"sortResultList()\">\n" +
    "        <md-option ng-repeat=\"sort in sortList track by $index\" value=\"{{$index}}\"><span translate=\"{{sort.text}}\"></span></md-option>\n" +
    "      </md-select>\n" +
    "    </md-input-container>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"infinite-scroll\" infinite-scroll=\"loadMoreResults()\" infinte-scroll-item=\".jd-detail\">\n" +
    "  <div class=\"jd-detail\" apprenticeship-detail=\"detail\" ng-repeat=\"detail in apprenticeships track by detail._id\"></div>\n" +
    "  <div ng-if=\"idle\" layout=\"row\" layout-sm=\"column\" layout-align=\"space-around\">\n" +
    "    <md-progress-circular md-mode=\"indeterminate\"></md-progress-circular>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<md-button ng-click=\"back()\" class=\"md-fab md-primary md-fab-bottom-right jd-floating-fab\" aria-label=\"global.navigation.search\" md-theme-watch=\"true\">\n" +
    "  <md-icon>arrow_backward</md-icon>\n" +
    "</md-button>\n"
  );


  $templateCache.put('views/content/apprenticeships/search.html',
    "<div id=\"filter\" layout=\"row\" layout-wrap layout-margin layout-padding layout-align=\"start center\" class=\"jd-floating-toolbar jd-floating-toolbar-fill-sm\" ng-class=\"{'md-whiteframe-z2':!mobile}\">\n" +
    "\n" +
    "  <div flex=\"15\" flex-sm=\"100\">\n" +
    "      <strong translate=\"apprenticeships.search.foundJobs\" translate-values=\"{value: count}\"></strong>\n" +
    "  </div>\n" +
    "\n" +
    "  <div flex=\"25\" flex-sm=\"100\" class=\"form-block\">\n" +
    "    <md-input-container ng-if=\"!searchParams.swissdocMajorGroup\">\n" +
    "      <label><span translate=\"apprenticeships.search.swissdocGroup\"></span></label>\n" +
    "      <md-select ng-model=\"searchParams.swissdocMajorGroup\" ng-change=\"countJobs()\">\n" +
    "        <md-option ng-repeat=\"swissdoc in swissdocMajorGroup\" value=\"{{swissdoc.code}}\"><span translate=\"{{swissdoc.text}}\"></span></md-option>\n" +
    "      </md-select>\n" +
    "    </md-input-container>\n" +
    "\n" +
    "    <md-input-container ng-if=\"searchParams.swissdocMajorGroup\">\n" +
    "      <label><span translate=\"swissdoc.0-{{searchParams.swissdocMajorGroup}}00-0-0\"></span></label>\n" +
    "\n" +
    "      <md-select ng-model=\"searchParams.swissdocGroupLevel2\" ng-change=\"countJobs()\">\n" +
    "        <md-option value=\"0\"><span translate=\"apprenticeships.search.allSubGroups\"></span></md-option>\n" +
    "        <md-option ng-repeat=\"swissdoc2 in swissdocGroupLevel2[searchParams.swissdocMajorGroup]\" value=\"{{swissdoc2.code}}\"><span translate=\"{{swissdoc2.text}}\"></span></md-option>\n" +
    "        <md-option value=\"-1\" ng-click=\"searchParams.swissdocMajorGroup='';searchParams.swissdocGroupLevel2='';countJobs()\"><md-icon>keyboard_arrow_left</md-icon><span class=\"jd-select-reset\" translate=\"apprenticeships.search.disableGroup\"></span></md-option>\n" +
    "      </md-select>\n" +
    "    </md-input-container>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "  <div flex=\"15\" flex-sm=\"100\" layout=\"row\" layout-align=\"start center\">\n" +
    "    <md-button class=\"md-icon-button jd-icon-button\" ng-click=\"setMyLocation()\">\n" +
    "      <md-icon>my_location</md-icon>\n" +
    "    </md-button>\n" +
    "\n" +
    "    <md-input-container hide-sm>\n" +
    "      <label translate=\"apprenticeships.search.location\"></label>\n" +
    "      <input class=\"keyboard\" type=\"text\" name=\"location\" id=\"location\" ng-model=\"nearestZip\" />\n" +
    "    </md-input-container>\n" +
    "\n" +
    "    <form ng-submit=\"setCurrentZip(currentZip)\" hide-gt-sm layout=\"row\" layout-align=\"start center\" flex>\n" +
    "      <md-input-container flex>\n" +
    "        <label translate=\"apprenticeships.search.location\"></label>\n" +
    "        <input type=\"number\" min=\"1000\" max=\"9999\" name=\"location-sm\" id=\"location-sm\" ng-model=\"currentZip\" />\n" +
    "      </md-input-container>\n" +
    "      <md-button class=\"md-icon-button jd-icon-button\">\n" +
    "        <md-icon>check</md-icon>\n" +
    "      </md-button>\n" +
    "    </form>\n" +
    "  </div>\n" +
    "\n" +
    "  <div flex=\"15\" flex-sm=\"50\">\n" +
    "    <md-radio-group ng-model=\"searchParams.distanceType\" ng-change=\"countJobs()\">\n" +
    "      <md-radio-button value=\"distance\" class=\"md-primary\" md-theme-watch=\"true\"><span translate=\"apprenticeships.search.distanceTypeDistance\"></span></md-radio-button>\n" +
    "      <md-radio-button value=\"travelTime\" class=\"md-primary\" md-theme-watch=\"true\"><span translate=\"apprenticeships.search.distanceTypeTravelTime\"></span></md-radio-button>\n" +
    "    </md-radio-group>\n" +
    "  </div>\n" +
    "\n" +
    "  <div flex=\"15\" flex-sm=\"50\">\n" +
    "    <md-input-container flex class=\"md-slider-has-label\" ng-if=\"searchParams.distanceType==='distance'\">\n" +
    "      <label translate=\"apprenticeships.search.distance\" translate-values=\"{value:searchParams.distance}\"></label>\n" +
    "      <md-slider ng-model=\"searchParams.distance\" step=\"{{distanceOptions.step}}\" min=\"{{distanceOptions.min}}\"\n" +
    "                 max=\"{{distanceOptions.max}}\" aria-label=\"distance\" ng-change=\"countJobs()\" class=\"md-primary\" md-theme-watch=\"true\"></md-slider>\n" +
    "    </md-input-container>\n" +
    "\n" +
    "    <md-input-container flex class=\"md-slider-has-label\" ng-if=\"searchParams.distanceType==='travelTime'\">\n" +
    "      <label translate=\"apprenticeships.search.travelTime\" translate-values=\"{value:showTimeInH(searchParams.travelTime)}\"></label>\n" +
    "      <md-slider ng-model=\"searchParams.travelTime\" step=\"{{travelTimeOptions.step}}\" min=\"{{travelTimeOptions.min}}\"\n" +
    "                 max=\"{{travelTimeOptions.max}}\" aria-label=\"travelTime\" ng-change=\"countJobs()\" class=\"md-primary\" md-theme-watch=\"true\"></md-slider>\n" +
    "    </md-input-container>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div align=\"center\" hide-sm>\n" +
    "  <swiss-map id=\"map\"></swiss-map>\n" +
    "</div>\n" +
    "\n" +
    "<md-button href=\"#/apprenticeship-results\" class=\"md-fab md-primary md-fab-bottom-right jd-floating-fab\" aria-label=\"global.navigation.search\" ng-disabled=\"count===0\" md-theme-watch=\"true\">\n" +
    "  <md-icon>arrow_forward</md-icon>\n" +
    "</md-button>\n"
  );


  $templateCache.put('views/content/config/config.html',
    "<md-content layout-padding>\n" +
    "  <h1 translate=\"config.title\"></h1>\n" +
    "\n" +
    "  <form name=\"configForm\" layout=\"row\" layout-wrap>\n" +
    "\n" +
    "    <strong class=\"md-title\" flex=\"100\">Standort</strong>\n" +
    "\n" +
    "    <md-input-container flex=\"100\">\n" +
    "      <label>Adresse</label>\n" +
    "      <input ng-model=\"config.address\" type=\"text\" />\n" +
    "    </md-input-container>\n" +
    "\n" +
    "    <md-input-container flex=\"50\">\n" +
    "      <label>Postleitzahl</label>\n" +
    "      <input name=\"zipInput\" ng-model=\"config.zip\" type=\"number\" min=\"1000\" max=\"9999\" required integer/>\n" +
    "    </md-input-container>\n" +
    "\n" +
    "    <md-input-container flex=\"50\" layout=\"row\">\n" +
    "      <md-button ng-disabled=\"configForm.zipInput.$invalid\" class=\"md-raised\" ng-click=\"receiveCoords()\">lookup</md-button>\n" +
    "      <md-progress-circular ng-if=\"idle\" md-mode=\"indeterminate\"></md-progress-circular>\n" +
    "    </md-input-container>\n" +
    "\n" +
    "    <md-input-container flex=\"50\">\n" +
    "      <label>Koordinaten / Longitude</label>\n" +
    "      <input ng-model=\"config.coords.lon\" ng-disabled=\"true\" type=\"text\" />\n" +
    "    </md-input-container>\n" +
    "\n" +
    "    <md-input-container flex=\"50\">\n" +
    "      <label>Koordinaten / Latitude</label>\n" +
    "      <input ng-model=\"config.coords.lat\" ng-disabled=\"true\" type=\"text\" />\n" +
    "    </md-input-container>\n" +
    "\n" +
    "    <strong class=\"md-title\" flex=\"100\">Angebot</strong>\n" +
    "\n" +
    "    <md-checkbox ng-model=\"config.educations\" class=\"md-primary\" aria-label=\"Weiterbildungsangebote\" flex=\"33\">\n" +
    "      Weiterbildungsangebote\n" +
    "    </md-checkbox>\n" +
    "\n" +
    "    <md-checkbox ng-model=\"config.apprenticeships\" class=\"md-primary\" aria-label=\"Lehrstellen\" flex=\"33\">\n" +
    "      Lehrstellen\n" +
    "    </md-checkbox>\n" +
    "\n" +
    "    <strong class=\"md-title\" flex=\"100\">Suchkriterien</strong>\n" +
    "\n" +
    "    <md-radio-group ng-model=\"config.distanceType\" flex=\"50\">\n" +
    "      <md-radio-button value=\"transport\" class=\"md-primary\">Umkreissuche nach Reisedauer mit öV</md-radio-button>\n" +
    "      <md-radio-button value=\"drive\" class=\"md-primary\">Umkreissuche nach Reisedauer mit PW</md-radio-button>\n" +
    "      <md-radio-button value=\"distance\" class=\"md-primary\">Umkreissuche nach Distanz</md-radio-button>\n" +
    "    </md-radio-group>\n" +
    "\n" +
    "    <md-radio-group ng-model=\"config.mapType\" flex=\"50\">\n" +
    "      <md-radio-button value=\"swisstopo\" class=\"md-primary\">swisstopo Karte</md-radio-button>\n" +
    "      <md-radio-button value=\"osm\" class=\"md-primary\">OpenStreetMap Karte</md-radio-button>\n" +
    "    </md-radio-group>\n" +
    "\n" +
    "    <div flex=\"100\">\n" +
    "      <md-button ng-disabled=\"!config.coords\" class=\"md-raised md-primary\" ng-click=\"saveConfig()\">save</md-button>\n" +
    "      <md-button class=\"md-raised md-warn\" ng-click=\"resetConfig()\">reset</md-button>\n" +
    "    </div>\n" +
    "\n" +
    "  </form>\n" +
    "</md-content>\n"
  );


  $templateCache.put('views/content/educations/educations.html',
    "<div layout=\"row\" layout-wrap layout-padding layout-align=\"space-between start\" class=\"jd-categories\">\n" +
    "\n" +
    "  <div class=\"category\" flex=\"33\" flex-sm=\"100\" ng-click=\"setSwissdocGroup(swissdoc.code)\" ng-repeat=\"swissdoc in swissdocMajorGroup\">\n" +
    "    <img class=\"iscoIcon\" ng-src=\"assets/images/{{swissdoc.img}}\" alt=\"swissdoc\" />\n" +
    "    <div class=\"category-title\"><span class=\"md-title\" translate=\"{{swissdoc.text}}\"></span></div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div flex=\"33\"></div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<md-button href=\"#/education-search\" class=\"md-fab md-primary md-fab-bottom-right jd-floating-fab\" aria-label=\"global.navigation.search\" md-theme-watch=\"true\">\n" +
    "  <md-icon>arrow_forward</md-icon>\n" +
    "</md-button>\n"
  );


  $templateCache.put('views/content/educations/result.html',
    "<div id=\"filter\" layout=\"row\" layout-margin layout-padding layout-align=\"space-between center\" class=\"md-whiteframe-z2 jd-floating-toolbar\">\n" +
    "  <div flex=\"25\" flex-sm=\"100\">\n" +
    "    <md-input-container class=\"md-select-has-label\">\n" +
    "      <label translate=\"educations.result.sorting\"></label>\n" +
    "      <md-select ng-model=\"sort\" ng-change=\"sortResultList()\">\n" +
    "        <md-option ng-repeat=\"sort in sortList track by $index\" value=\"{{$index}}\"><span translate=\"{{sort.text}}\"></span></md-option>\n" +
    "      </md-select>\n" +
    "    </md-input-container>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"infinite-scroll\" infinite-scroll=\"loadMoreResults()\" infinte-scroll-item=\".jd-detail\">\n" +
    "  <div class=\"jd-detail\" education-detail=\"detail\" ng-repeat=\"detail in educations track by detail._id\"></div>\n" +
    "  <div ng-if=\"idle\" layout=\"row\" layout-sm=\"column\" layout-align=\"space-around\">\n" +
    "    <md-progress-circular md-mode=\"indeterminate\"></md-progress-circular>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<md-button ng-click=\"back()\" class=\"md-fab md-primary md-fab-bottom-right jd-floating-fab\" aria-label=\"global.navigation.search\" md-theme-watch=\"true\">\n" +
    "  <md-icon>arrow_backward</md-icon>\n" +
    "</md-button>\n"
  );


  $templateCache.put('views/content/educations/search.html',
    "<div id=\"filter\" layout=\"row\" layout-wrap layout-margin layout-padding layout-align=\"start center\" class=\"jd-floating-toolbar jd-floating-toolbar-fill-sm\" ng-class=\"{'md-whiteframe-z2':!mobile}\">\n" +
    "\n" +
    "  <div flex=\"15\" flex-sm=\"100\">\n" +
    "      <strong translate=\"educations.search.foundJobs\" translate-values=\"{value: count}\"></strong>\n" +
    "  </div>\n" +
    "\n" +
    "  <div flex=\"25\" flex-sm=\"100\" class=\"form-block\">\n" +
    "    <md-input-container ng-if=\"!searchParams.swissdocMajorGroup\">\n" +
    "      <label><span translate=\"educations.search.educationGroup\"></span></label>\n" +
    "\n" +
    "      <md-select ng-model=\"searchParams.swissdocMajorGroup\" ng-change=\"countJobs()\">\n" +
    "        <md-option ng-repeat=\"swissdoc in swissdocMajorGroup\" value=\"{{swissdoc.code}}\"><span translate=\"{{swissdoc.text}}\"></span></md-option>\n" +
    "      </md-select>\n" +
    "    </md-input-container>\n" +
    "\n" +
    "    <md-input-container ng-if=\"searchParams.swissdocMajorGroup\">\n" +
    "      <label><span translate=\"swissdoc.0-{{searchParams.swissdocMajorGroup}}00-0-0\"></span></label>\n" +
    "\n" +
    "      <md-select ng-model=\"searchParams.swissdocGroupLevel2\" ng-change=\"countJobs()\">\n" +
    "        <md-option value=\"0\"><span translate=\"educations.search.allSubGroups\"></span></md-option>\n" +
    "        <md-option ng-repeat=\"swissdoc2 in swissdocGroupLevel2[searchParams.swissdocMajorGroup]\" value=\"{{swissdoc2.code}}\"><span translate=\"{{swissdoc2.text}}\"></span></md-option>\n" +
    "        <md-option value=\"-1\" ng-click=\"searchParams.swissdocMajorGroup='';searchParams.swissdocGroupLevel2='';countJobs()\"><md-icon>keyboard_arrow_left</md-icon><span class=\"jd-select-reset\" translate=\"educations.search.disableGroup\"></span></md-option>\n" +
    "      </md-select>\n" +
    "    </md-input-container>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "  <div flex=\"15\" flex-sm=\"100\" layout=\"row\" layout-align=\"start center\">\n" +
    "    <md-button class=\"md-icon-button jd-icon-button\" ng-click=\"setMyLocation()\">\n" +
    "      <md-icon>my_location</md-icon>\n" +
    "    </md-button>\n" +
    "\n" +
    "    <md-input-container hide-sm>\n" +
    "      <label translate=\"educations.search.location\"></label>\n" +
    "      <input class=\"keyboard\" type=\"text\" name=\"location\" id=\"location\" ng-model=\"nearestZip\" />\n" +
    "    </md-input-container>\n" +
    "\n" +
    "    <form ng-submit=\"setCurrentZip(currentZip)\" hide-gt-sm layout=\"row\" layout-align=\"start center\" flex>\n" +
    "      <md-input-container flex>\n" +
    "        <label translate=\"educations.search.location\"></label>\n" +
    "        <input type=\"number\" min=\"1000\" max=\"9999\" name=\"location-sm\" id=\"location-sm\" ng-model=\"currentZip\" />\n" +
    "      </md-input-container>\n" +
    "      <md-button class=\"md-icon-button jd-icon-button\">\n" +
    "        <md-icon>check</md-icon>\n" +
    "      </md-button>\n" +
    "    </form>\n" +
    "  </div>\n" +
    "\n" +
    "  <div flex=\"15\" flex-sm=\"50\">\n" +
    "    <md-radio-group ng-model=\"searchParams.distanceType\" ng-change=\"countJobs()\">\n" +
    "      <md-radio-button value=\"distance\" class=\"md-primary\" md-theme-watch=\"true\"><span translate=\"educations.search.distanceTypeDistance\"></span></md-radio-button>\n" +
    "      <md-radio-button value=\"travelTime\" class=\"md-primary\" md-theme-watch=\"true\"><span translate=\"educations.search.distanceTypeTravelTime\"></span></md-radio-button>\n" +
    "    </md-radio-group>\n" +
    "  </div>\n" +
    "\n" +
    "  <div flex=\"15\" flex-sm=\"50\">\n" +
    "    <md-input-container flex class=\"md-slider-has-label\" ng-if=\"searchParams.distanceType==='distance'\">\n" +
    "      <label translate=\"educations.search.distance\" translate-values=\"{value:searchParams.distance}\"></label>\n" +
    "      <md-slider ng-model=\"searchParams.distance\" step=\"{{distanceOptions.step}}\" min=\"{{distanceOptions.min}}\"\n" +
    "                 max=\"{{distanceOptions.max}}\" aria-label=\"distance\" ng-change=\"countJobs()\" class=\"md-primary\" md-theme-watch=\"true\"></md-slider>\n" +
    "    </md-input-container>\n" +
    "\n" +
    "    <md-input-container flex class=\"md-slider-has-label\" ng-if=\"searchParams.distanceType==='travelTime'\">\n" +
    "      <label translate=\"educations.search.travelTime\" translate-values=\"{value:showTimeInH(searchParams.travelTime)}\"></label>\n" +
    "      <md-slider ng-model=\"searchParams.travelTime\" step=\"{{travelTimeOptions.step}}\" min=\"{{travelTimeOptions.min}}\"\n" +
    "                 max=\"{{travelTimeOptions.max}}\" aria-label=\"travelTime\" ng-change=\"countJobs()\" class=\"md-primary\" md-theme-watch=\"true\"></md-slider>\n" +
    "    </md-input-container>\n" +
    "  </div>\n" +
    "\n" +
    "  <div flex=\"15\" flex-sm=\"100\" class=\"form-block\">\n" +
    "    <md-input-container class=\"md-select-has-label\">\n" +
    "      <label translate=\"educations.search.language\"></label>\n" +
    "\n" +
    "      <md-select ng-model=\"searchParams.language\" ng-change=\"countJobs()\">\n" +
    "        <md-option value=\"\"><span translate=\"educations.search.allLanguages\"></span></md-option>\n" +
    "        <md-option ng-repeat=\"lang in courseLanguages\" value=\"{{lang.code}}\"><span translate=\"{{lang.text}}\"></span></md-option>\n" +
    "      </md-select>\n" +
    "    </md-input-container>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div align=\"center\" hide-sm>\n" +
    "  <swiss-map id=\"map\"></swiss-map>\n" +
    "</div>\n" +
    "\n" +
    "<md-button href=\"#/education-results\" class=\"md-fab md-primary md-fab-bottom-right jd-floating-fab\" aria-label=\"global.navigation.search\" ng-disabled=\"count===0\" md-theme-watch=\"true\">\n" +
    "  <md-icon>arrow_forward</md-icon>\n" +
    "</md-button>\n"
  );


  $templateCache.put('views/content/error/error.html',
    "<div ng-cloak>\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-12\">\n" +
    "            <h1 translate=\"errors.title\">Error Page!</h1>\n" +
    "\n" +
    "            <div ng-if=\"errorMessage\">\n" +
    "                <div class=\"alert alert-danger\" translate=\"{{errorMessage}}\" >\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('views/content/jobs/jobs.html',
    "<div layout=\"row\" layout-padding layout-wrap class=\"jd-categories\">\n" +
    "\n" +
    "  <div class=\"category\" flex=\"33\" flex-xs=\"100\" ng-repeat=\"isco in iscoMajorGroup\">\n" +
    "    <img ng-click=\"setIscoGroup(isco.code)\" class=\"iscoIcon\" ng-src=\"assets/images/{{isco.img}}\" alt=\"isco\" />\n" +
    "    <div class=\"category-title\" layout=\"row\">\n" +
    "      <md-icon ng-click=\"showIscoUnitGroup($event,isco.code,iscoMinorGroups)\" flex>help_outline</md-icon>\n" +
    "      <span flex=\"90\" ng-click=\"setIscoGroup(isco.code)\" class=\"md-title\" translate=\"{{isco.text}}\"></span>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<md-button href=\"#/job-search\" class=\"md-fab md-primary md-fab-bottom-right jd-floating-fab\" aria-label=\"global.navigation.search\" md-theme-watch=\"true\">\n" +
    "  <md-icon>arrow_forward</md-icon>\n" +
    "</md-button>\n"
  );


  $templateCache.put('views/content/jobs/result.html',
    "<div class=\"jd-floating-toolbar no-scrollbar\">\n" +
    "  <div id=\"filter\" layout=\"row\" layout-wrap layout-margin layout-align=\"start center\" class=\"md-whiteframe-z2\">\n" +
    "    <div flex=\"25\" flex-xs=\"100\" class=\"form-block\">\n" +
    "      <md-input-container>\n" +
    "        <label translate=\"jobs.result.sorting\"></label>\n" +
    "        <md-select ng-model=\"sort\" ng-change=\"sortResultList()\">\n" +
    "          <md-option ng-repeat=\"sort in sortList track by $index\" value=\"{{$index}}\"><span translate=\"{{sort.text}}\"></span></md-option>\n" +
    "        </md-select>\n" +
    "      </md-input-container>\n" +
    "    </div>\n" +
    "    <div flex=\"20\" hide-xs>\n" +
    "      <md-radio-group ng-model=\"searchParams.fulltime\" ng-change=\"countJobs()\">\n" +
    "        <md-radio-button value=\"1\" class=\"md-primary\" aria-label=\"all jobs\"><span translate=\"jobs.search.allJobs\"></span></md-radio-button>\n" +
    "        <md-radio-button value=\"2\" class=\"md-primary\" aria-label=\"part time jobs\"><span translate=\"jobs.search.parttimeJobs\"></span></md-radio-button>\n" +
    "      </md-radio-group>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"infinite-scroll no-scrollbar\" infinite-scroll=\"loadMoreResults()\" infinte-scroll-item=\".jd-detail\">\n" +
    "      <div class=\"jd-detail\" job-detail=\"jobDetail\" last-opened-job=\"lastOpenedJob\" is-mobile=\"mobile\" sorting=\"sort\" ng-repeat=\"jobDetail in jobs track by jobDetail._id\"></div>\n" +
    "      <div ng-if=\"idle\" layout=\"row\" layout-sm=\"column\" layout-align=\"center center\">\n" +
    "        <md-progress-circular md-mode=\"indeterminate\" md-diameter=\"120\"></md-progress-circular>\n" +
    "      </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<md-button ng-href=\"#/job-search\" class=\"md-fab md-primary md-fab-bottom-right jd-floating-fab\" aria-label=\"global.navigation.search\" md-theme-watch=\"true\">\n" +
    "  <md-icon>arrow_backward</md-icon>\n" +
    "</md-button>\n"
  );


  $templateCache.put('views/content/jobs/search.html',
    "<div layout-xs=\"row\" layout-wrap class=\"no-scrollbar\" ng-class=\"{'jd-floating-toolbar':!mobile}\">\n" +
    "  <div id=\"filter\" flex-order-xs=\"2\" layout=\"row\" layout-wrap layout-margin layout-align=\"start center\" class=\"md-whiteframe-z2\">\n" +
    "\n" +
    "    <div flex=\"60\" layout=\"row\" layout-wrap flex-xs=\"100\" id=\"iscoGroup\">\n" +
    "      <md-input-container flex=\"60\" flex-xs=\"100\" class=\"md-block isco-select\" ng-if=\"!searchParams.iscoMajorGroup\">\n" +
    "        <label><span translate=\"jobs.search.jobgroup\"></span></label>\n" +
    "        <md-select ng-model=\"searchParams.iscoMajorGroup\" ng-change=\"countJobs()\">\n" +
    "          <md-option ng-repeat=\"isco in iscoMajorGroup\" value=\"{{isco.code}}\"><span translate=\"{{isco.text}}\"></span></md-option>\n" +
    "        </md-select>\n" +
    "      </md-input-container>\n" +
    "\n" +
    "      <md-input-container flex=\"60\" flex-xs=\"100\" class=\"md-block isco-select\" ng-if=\"searchParams.iscoMajorGroup\">\n" +
    "        <label><span translate=\"isco.majorGroups.{{searchParams.iscoMajorGroup}}\"></span></label>\n" +
    "        <md-select ng-model=\"searchParams.iscoGroupLevel3\" ng-change=\"countJobs()\">\n" +
    "          <md-option value=\"0\"><span translate=\"jobs.search.allSubGroups\"></span></md-option>\n" +
    "          <md-option ng-repeat=\"minorGroup in iscoMinorGroups[searchParams.iscoMajorGroup]\" value=\"{{minorGroup}}\"><span translate=\"isco.minorGroups.{{minorGroup}}\"></span></md-option>\n" +
    "          <md-option value=\"-1\" ng-click=\"searchParams.iscoMajorGroup='';searchParams.iscoGroupLevel3='';countJobs()\"><md-icon>keyboard_arrow_left</md-icon><span class=\"jd-select-reset\" translate=\"jobs.search.disableGroup\"></span></md-option>\n" +
    "        </md-select>\n" +
    "      </md-input-container>\n" +
    "\n" +
    "      <div class=\"filter-button-container my-location-button\" flex flex-xs=\"15\">\n" +
    "        <md-button class=\"md-icon-button jd-icon-button\" ng-click=\"setMyLocation()\">\n" +
    "          <md-icon id=\"resetLocation\">my_location</md-icon>\n" +
    "        </md-button>\n" +
    "      </div>\n" +
    "\n" +
    "      <md-input-container flex=\"30\" hide-xs id=\"zip\">\n" +
    "        <label translate=\"jobs.search.location\"></label>\n" +
    "        <input class=\"keyboard\" type=\"text\" name=\"location\" id=\"location\" ng-model=\"nearestZip\" />\n" +
    "      </md-input-container>\n" +
    "\n" +
    "      <div flex-xs=\"85\" hide-gt-xs layout=\"row\" layout-align=\"start center\" class=\"zip-form\">\n" +
    "        <md-input-container flex-xs=\"70\">\n" +
    "          <label translate=\"jobs.search.location\"></label>\n" +
    "          <input type=\"number\" min=\"1000\" max=\"9999\" name=\"location-sm\" id=\"location-sm\" ng-model=\"currentZip\" />\n" +
    "        </md-input-container>\n" +
    "\n" +
    "        <div class=\"mobile filter-button-container\" flex>\n" +
    "          <md-button class=\"md-icon-button jd-icon-button\" ng-click=\"setCurrentZip(false)\">\n" +
    "            <md-icon>check</md-icon>\n" +
    "          </md-button>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div flex=\"15\" flex-xs=\"40\" id=\"distanceType\">\n" +
    "      <md-radio-group ng-model=\"searchParams.distanceType\" ng-change=\"countJobs()\" ng-init=\"searchParams.distanceType=searchParams.distanceType || appConfig.distanceType || 'distance'\">\n" +
    "        <md-radio-button value=\"distance\" class=\"md-primary\" aria-label=\"distance\"><span translate=\"jobs.search.distanceTypeDistance\"></span></md-radio-button>\n" +
    "        <md-radio-button value=\"transport\" class=\"md-primary\" aria-label=\"travel time\"><span translate=\"jobs.search.distanceTypeTransport\"></span></md-radio-button>\n" +
    "        <md-radio-button value=\"drive\" class=\"md-primary\" aria-label=\"travel time\"><span translate=\"jobs.search.distanceTypeDrive\"></span></md-radio-button>\n" +
    "      </md-radio-group>\n" +
    "    </div>\n" +
    "\n" +
    "    <div flex=\"15\" flex-xs=\"40\" id=\"distanceTypeParameter\">\n" +
    "      <div flex ng-if=\"searchParams.distanceType==='distance'\">\n" +
    "        <label class=\"md-slider-label\" translate=\"jobs.search.distance\" translate-values=\"{value:searchParams.distance}\"></label>\n" +
    "        <md-slider ng-model=\"searchParams.distance\" step=\"{{distanceOptions.step}}\" min=\"{{distanceOptions.min}}\" max=\"{{distanceOptions.max}}\" aria-label=\"distance\" ng-change=\"countJobs()\" class=\"md-primary\"></md-slider>\n" +
    "      </div>\n" +
    "\n" +
    "      <div flex ng-if=\"searchParams.distanceType==='transport'\">\n" +
    "        <label class=\"md-slider-label\" translate=\"jobs.search.travelTime\" translate-values=\"{value:showTimeInH(searchParams.travelTime)}\"></label>\n" +
    "        <md-slider ng-model=\"searchParams.travelTime\" step=\"{{transportOptions.step}}\" min=\"{{transportOptions.min}}\" max=\"{{transportOptions.max}}\" aria-label=\"travelTime\" ng-change=\"countJobs()\" class=\"md-primary\"></md-slider>\n" +
    "      </div>\n" +
    "\n" +
    "      <div flex ng-if=\"searchParams.distanceType==='drive'\">\n" +
    "        <label class=\"md-slider-label\" translate=\"jobs.search.travelTime\" translate-values=\"{value:showTimeInH(searchParams.travelTime)}\"></label>\n" +
    "        <md-slider ng-model=\"searchParams.travelTime\" step=\"{{driveOptions.step}}\" min=\"{{driveOptions.min}}\" max=\"{{driveOptions.max}}\" aria-label=\"drive\" ng-change=\"countJobs()\" class=\"md-primary\"></md-slider>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div flex hide-xs>\n" +
    "      <md-button ng-click=\"startTour()\" class=\"md-icon-button\"><md-icon>help</md-icon></md-button>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div align=\"center\" flex-order-xs=\"1\">\n" +
    "    <div id=\"map\" class=\"map\" map-tiles=\"{{appConfig.mapType}}\"></div>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div layout=\"row\" layout-margin layout-align=\"start center\" class=\"jd-bottom-right\">\n" +
    "  <strong ng-show=\"!idle\" translate=\"jobs.search.foundJobs\" translate-values=\"{value: count}\"></strong>\n" +
    "  <md-progress-circular ng-show=\"idle\" md-mode=\"indeterminate\" md-diameter=\"120\"></md-progress-circular>\n" +
    "</div>\n" +
    "\n" +
    "<md-button href=\"#/job-results\" class=\"md-fab md-primary md-fab-bottom-right jd-floating-fab\" aria-label=\"global.navigation.search\" ng-disabled=\"count===0 || idle\" md-theme-watch=\"true\">\n" +
    "  <md-icon>arrow_forward</md-icon>\n" +
    "</md-button>\n" +
    "\n" +
    "<tour step=\"currentStep\" post-tour=\"tourEnded()\">\n" +
    "  <virtual-step tourtip=\"{{tourTranslate('jobs.search.tour.jobGroups')}}\" tourtip-step=\"0\"  tourtip-placement=\"bottom\" tourtip-element=\"#iscoGroup\" tourtip-offset-vertical=\"-20\"></virtual-step>\n" +
    "  <virtual-step tourtip=\"{{tourTranslate('jobs.search.tour.location')}}\" tourtip-step=\"1\"  tourtip-placement=\"right\" tourtip-element=\".current-location\" tourtip-offset-horizontal=\"10\" tourtip-offset-vertical=\"-25\"></virtual-step>\n" +
    "  <virtual-step tourtip=\"{{tourTranslate('jobs.search.tour.distanceType')}}\" tourtip-step=\"2\"  tourtip-placement=\"bottom\" tourtip-element=\"#distanceType\"tourtip-offset-vertical=\"-10\"></virtual-step>\n" +
    "  <virtual-step tourtip=\"{{tourTranslate('jobs.search.tour.distanceTypeParameter')}}\" tourtip-step=\"3\"  tourtip-placement=\"left\" tourtip-element=\"#distanceTypeParameter\"></virtual-step>\n" +
    "  <virtual-step tourtip=\"{{tourTranslate('jobs.search.tour.changeZip')}}\" tourtip-step=\"4\"  tourtip-placement=\"bottom\" tourtip-element=\"#zip\"></virtual-step>\n" +
    "  <virtual-step tourtip=\"{{tourTranslate('jobs.search.tour.resetLocation')}}\" tourtip-step=\"5\"  tourtip-placement=\"left\" tourtip-element=\"#resetLocation\" tourtip-offset-vertical=\"-30\"></virtual-step>\n" +
    "  <virtual-step tourtip=\"{{tourTranslate('jobs.search.tour.countJobs')}}\" tourtip-step=\"6\"  tourtip-placement=\"top\" tourtip-element=\".jd-bottom-right\"></virtual-step>\n" +
    "</tour>\n"
  );


  $templateCache.put('views/content/localInfo/localInfo.html',
    "<h1>localInfo</h1>\n" +
    "<script>\n" +
    "  if (!String.prototype.trim) {\n" +
    "    String.prototype.trim = function() {\n" +
    "      return this.replace(/^\\s+|\\s+$/g, '');\n" +
    "    };\n" +
    "  }\n" +
    "\n" +
    "  proj4.defs(\"EPSG:21781\",\"+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=600000 +y_0=200000 +ellps=bessel +towgs84=674.4,15.1,405.3,0,0,0,0 +units=m +no_defs\");\n" +
    "\n" +
    "    var res = [4000, 3750, 3500, 3250, 3000, 2750, 2500, 2250, 2000, 1750, 1500, 1250, 1000, 750, 650, 500, 250, 100, 50, 20, 10, 5, 2.5, 2, 1.5, 1, 0.5];\n" +
    "\n" +
    "    var scale = function(zoom) {\n" +
    "        return 1 / res[zoom];\n" +
    "      },\n" +
    "\n" +
    "      crs = new L.Proj.CRS('EPSG:21781', '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 ' + '+k_0=1 +x_0=600000 +y_0=200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs', {\n" +
    "        resolutions: res,\n" +
    "        origin: [420000, 350000]\n" +
    "      });\n" +
    "\n" +
    "    var map = new L.Map('map', {\n" +
    "      crs:crs,\n" +
    "      continuousWorld: true,\n" +
    "      worldCopyJump: false,\n" +
    "      scale: scale,\n" +
    "\n" +
    "      zoomControl: true,\n" +
    "      scrollWheelZoom: false,\n" +
    "      doubleClickZoom: true,\n" +
    "      maxBounds: [\n" +
    "        [45.5, 5.5],\n" +
    "        [48, 11]\n" +
    "      ]\n" +
    "    });\n" +
    "\n" +
    "    var mapUrl = 'https://wmts6.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/20140520/21781/{z}/{y}/{x}.jpeg',\n" +
    "      attrib = 'Map data &copy; 2014 swisstopo',\n" +
    "      tilelayer = new L.TileLayer(mapUrl, {\n" +
    "        scheme: 'xyz',\n" +
    "        maxZoom: res.length - 1,\n" +
    "        minZoom: 0,\n" +
    "        opacity: 0.75,\n" +
    "        continuousWorld: true,\n" +
    "        attribution: attrib\n" +
    "      });\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    map.addLayer(tilelayer);\n" +
    "\n" +
    "    map.setView([46.8, 8.3], 15);\n" +
    "</script>\n" +
    "\n" +
    "<div id=\"map\"></div>\n" +
    "\n" +
    "<md-button ng-click=\"back()\" class=\"md-fab md-primary md-fab-bottom-right jd-floating-fab\"\n" +
    "           aria-label=\"global.navigation.search\" md-theme-watch=\"true\">\n" +
    "  <md-icon>arrow_backward</md-icon>\n" +
    "</md-button>\n"
  );


  $templateCache.put('views/template/apprenticeship-detail.html',
    "<div layout=\"row\" layout-wrap layout-align=\"space-between start\" style=\"padding: 10px;\">\n" +
    "  <div flex flex-sm=\"100\">\n" +
    "    <h4 class=\"strong\">{{getMultiLanguageText(apprenticeshipDetail._source.titleM)}}/{{getMultiLanguageText(apprenticeshipDetail._source.titleW)}} <span ng-if=\"apprenticeshipDetail._source.amount>1\" translate=\"apprenticeships.results.apprenticeshipAmount\" translate-values=\"{value: apprenticeshipDetail._source.amount}\"></span></h4>\n" +
    "\n" +
    "    <p ng-bind-html=\"getMultiLanguageText(apprenticeshipDetail._source.description)\"></p>\n" +
    "\n" +
    "    <div>\n" +
    "      <strong>{{apprenticeshipDetail._source.company.name}}</strong><br />\n" +
    "      <strong ng-if=\"apprenticeshipDetail._source.company.contact.fullName\">{{apprenticeshipDetail._source.company.contact.fullName}}<br /></strong>\n" +
    "      <span>{{apprenticeshipDetail._source.company.address.street}}</span><br />\n" +
    "      <span>{{apprenticeshipDetail._source.company.address.zip}} {{apprenticeshipDetail._source.company.address.location}}</span><br />\n" +
    "      <span ng-if=\"apprenticeshipDetail._source.company.contact.phone\">{{apprenticeshipDetail._source.company.contact.phone}}<br /></span>\n" +
    "      <span ng-if=\"apprenticeshipDetail._source.company.contact.eMail\">{{apprenticeshipDetail._source.company.contact.eMail}}</span>\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "  <div flex=\"20\" hide-sm>\n" +
    "    <md-button ng-click=\"showPrintDialog()\"><md-icon>print</md-icon>&nbsp;<span translate=\"apprenticeships.result.print\"></span></md-button>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<md-divider></md-divider>\n"
  );


  $templateCache.put('views/template/apprenticeship-print.html',
    "<md-dialog md-theme=\"apprenticeships\">\n" +
    "  <md-toolbar>\n" +
    "    <div class=\"md-toolbar-tools\">\n" +
    "      <h2><span translate=\"apprenticeships.result.print\"></span></h2>\n" +
    "      <span flex></span>\n" +
    "    </div>\n" +
    "  </md-toolbar>\n" +
    "  <md-dialog-content>\n" +
    "    <div id=\"printableArea\">\n" +
    "      <strong>{{::getMultiLanguageText(apprenticeshipDetail._source.titleM)}}/{{::getMultiLanguageText(apprenticeshipDetail._source.titleW)}}\n" +
    "        <span ng-if=\"apprenticeshipDetail._source.amount>1\" translate=\"apprenticeships.results.apprenticeshipAmount\" translate-values=\"{value: apprenticeshipDetail._source.amount}\"></span>\n" +
    "      </strong>\n" +
    "\n" +
    "      <p ng-bind-html=\"formatText(getMultiLanguageText(apprenticeshipDetail._source.description))\"></p>\n" +
    "\n" +
    "      <div>\n" +
    "        <strong>{{::apprenticeshipDetail._source.company.name}}</strong><br />\n" +
    "        <strong ng-if=\"apprenticeshipDetail._source.company.contact.fullName\">{{::apprenticeshipDetail._source.company.contact.fullName}}<br /></strong>\n" +
    "        <span>{{::apprenticeshipDetail._source.company.address.street}}</span><br />\n" +
    "        <span>{{::apprenticeshipDetail._source.company.address.zip}} {{::apprenticeshipDetail._source.company.address.location}}</span><br />\n" +
    "        <span ng-if=\"apprenticeshipDetail._source.company.contact.phone\">{{::apprenticeshipDetail._source.company.contact.phone}}<br /></span>\n" +
    "        <span ng-if=\"apprenticeshipDetail._source.company.contact.eMail\">{{::apprenticeshipDetail._source.company.contact.eMail}}</span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div layout=\"row\" layout-sm=\"column\" layout-align=\"space-around\">\n" +
    "      <md-progress-circular md-mode=\"indeterminate\" md-diameter=\"60\"></md-progress-circular>\n" +
    "    </div>\n" +
    "\n" +
    "  </md-dialog-content>\n" +
    "</md-dialog>\n" +
    "\n"
  );


  $templateCache.put('views/template/core/language-switcher.html',
    "<md-select ng-model=\"currentLanguage\" aria-label=\"current language\">\n" +
    "  <md-option ng-click=\"changeLanguage(language)\" ng-value=\"language\" ng-repeat=\"language in allLanguages\">{{ language }}</md-option>\n" +
    "</md-select>\n"
  );


  $templateCache.put('views/template/education-detail.html',
    "<div layout=\"row\" layout-wrap layout-align=\"space-between start\" style=\"padding: 10px;\">\n" +
    "  <div flex flex-sm=\"100\" ng-click=\"showDetail()\">\n" +
    "    <h4 class=\"strong\">{{educationDetail._source.title}}</h4>\n" +
    "    <strong><span translate=\"educations.result.location\"></span> {{educationDetail._source.location.zip}} {{educationDetail._source.location.name}}</strong>\n" +
    "    <div ng-if=\"!showDetailContent\">\n" +
    "      <p ng-text-truncate=\"educationDetail._source.content\" ng-tt-words-threshold=\"20\" ng-tt-no-toggling></p>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"showDetailContent\" layout=\"row\" layout-wrap layout-align=\"space-between start\">\n" +
    "\n" +
    "      <p flex=\"100\" ng-bind-html=\"educationDetail._source.content\"></p>\n" +
    "\n" +
    "      <div flex=\"25\" flex-sm=\"100\">\n" +
    "        <strong>{{educationDetail._source.provider.name}}</strong><br />\n" +
    "        <strong ng-if=\"educationDetail._source.provider.contact.firstName\">{{educationDetail._source.provider.contact.firstName}} {{educationDetail._source.provider.contact.lastName}}<br /></strong>\n" +
    "        <span>{{educationDetail._source.provider.address.street}}</span><br />\n" +
    "        <span>{{educationDetail._source.location.zip}} {{educationDetail._source.location.name}}</span><br />\n" +
    "        <span ng-if=\"educationDetail._source.provider.phone\"><span translate=\"educations.result.phone\" translate-values=\"{value: educationDetail._source.provider.phone}\"></span><br /></span>\n" +
    "        <span ng-if=\"educationDetail._source.provider.fax\"><span translate=\"educations.result.fax\" translate-values=\"{value: educationDetail._source.provider.fax}\"></span><br /></span>\n" +
    "        <span ng-if=\"educationDetail._source.provider.eMail\">{{educationDetail._source.provider.eMail}}<br /></span>\n" +
    "        <span ng-if=\"educationDetail._source.provider.url\">{{educationDetail._source.provider.url}}</span>\n" +
    "      </div>\n" +
    "\n" +
    "      <div flex=\"25\" flex-sm=\"100\">\n" +
    "          <div ng-if=\"educationDetail._source.startText\"><strong translate=\"educations.result.start\"></strong> <span ng-bind-html=\"educationDetail._source.startText\"></span></div>\n" +
    "          <div ng-if=\"educationDetail._source.duration\"><strong translate=\"educations.result.duration\"></strong> <span ng-bind-html=\"educationDetail._source.duration\"></span></div>\n" +
    "          <div ng-if=\"educationDetail._source.activity\"><strong translate=\"educations.result.activity\"></strong> <span ng-bind-html=\"educationDetail._source.activity\"></span></div>\n" +
    "          <div ng-if=\"educationDetail._source.cost\"><strong translate=\"educations.result.cost\"></strong> <span ng-bind-html=\"educationDetail._source.cost\"></span></div>\n" +
    "        <div ng-if=\"educationDetail._source.languages\"><strong translate=\"educations.result.language\"></strong> <span translate=\"educations.result.languages.{{checkLanguage(educationDetail._source.languages)}}\"></span></div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div flex=\"25\" flex-sm=\"100\">\n" +
    "        <div ng-if=\"educations.result.target\">\n" +
    "          <strong translate=\"educations.result.target\"></strong>\n" +
    "          <p ng-bind-html=\"educationDetail._source.target\"></p>\n" +
    "        </div>\n" +
    "        <div ng-if=\"educations.result.preconditions\">\n" +
    "          <strong translate=\"educations.result.preconditions\"></strong>\n" +
    "          <p ng-bind-html=\"educationDetail._source.preconditions\"></p>\n" +
    "        </div>\n" +
    "        <div>\n" +
    "          <strong translate=\"educations.result.degree\"></strong>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div flex=\"25\" flex-sm=\"100\">\n" +
    "        <div ng-if=\"educationDetail._source.comments.class || educationDetail._source.comments.offers\">\n" +
    "          <strong translate=\"educations.result.comments\"></strong>\n" +
    "          <p ng-bind-html=\"educationDetail._source.comments.class\"></p>\n" +
    "          <p ng-bind-html=\"educationDetail._source.comments.offers\"></p>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div flex=\"20\" hide-sm>\n" +
    "    <md-button ng-click=\"showDetail()\">\n" +
    "      <span ng-if=\"!showDetailContent\">\n" +
    "        <md-icon>search</md-icon>&nbsp;<span translate=\"educations.result.showMore\"></span>\n" +
    "      </span>\n" +
    "      <span ng-if=\"showDetailContent\">\n" +
    "        <md-icon>close</md-icon>&nbsp;<span translate=\"educations.result.showLess\"></span>\n" +
    "      </span>\n" +
    "    </md-button>\n" +
    "    <p></p>\n" +
    "    <md-button ng-click=\"showPrintDialog()\"><md-icon>print</md-icon>&nbsp;<span translate=\"educations.result.print\"></span></md-button>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<md-divider></md-divider>\n"
  );


  $templateCache.put('views/template/education-print.html',
    "<md-dialog md-theme=\"educations\">\n" +
    "  <md-toolbar>\n" +
    "    <div class=\"md-toolbar-tools\">\n" +
    "      <h2><span translate=\"educations.result.print\"></span></h2>\n" +
    "      <span flex></span>\n" +
    "    </div>\n" +
    "  </md-toolbar>\n" +
    "  <md-dialog-content>\n" +
    "\n" +
    "    <div id=\"printableArea\">\n" +
    "\n" +
    "      <strong>{{::educationDetail._source.title}}</strong><br />\n" +
    "      <strong><span translate=\"educations.result.location\"></span></strong> : {{::educationDetail._source.location.zip}} {{::educationDetail._source.location.name}}\n" +
    "\n" +
    "      <p ng-bind-html=\"formatText(educationDetail._source.content)\"></p>\n" +
    "\n" +
    "      <strong>{{::educationDetail._source.provider.name}}</strong><br />\n" +
    "      <strong ng-if=\"educationDetail._source.provider.contact.firstName\">{{::educationDetail._source.provider.contact.firstName}} {{::educationDetail._source.provider.contact.lastName}}<br /></strong>\n" +
    "      <span>{{::educationDetail._source.provider.address.street}}</span><br />\n" +
    "      <span>{{::educationDetail._source.location.zip}} {{::educationDetail._source.location.name}}</span><br />\n" +
    "      <span ng-if=\"educationDetail._source.provider.phone\"><span translate=\"educations.result.phone\" translate-values=\"{value: educationDetail._source.provider.phone}\"></span><br /></span>\n" +
    "      <span ng-if=\"educationDetail._source.provider.fax\"><span translate=\"educations.result.fax\" translate-values=\"{value: educationDetail._source.provider.fax}\"></span><br /></span>\n" +
    "      <span ng-if=\"educationDetail._source.provider.eMail\">{{::educationDetail._source.provider.eMail}}<br /></span>\n" +
    "      <span ng-if=\"educationDetail._source.provider.url\">{{::educationDetail._source.provider.url}}</span>\n" +
    "\n" +
    "      <div ng-if=\"educationDetail._source.startText\"><strong translate=\"educations.result.start\"></strong> : <span ng-bind-html=\"educationDetail._source.startText\"></span></div>\n" +
    "      <div ng-if=\"educationDetail._source.duration\"><strong translate=\"educations.result.duration\"></strong> : <span ng-bind-html=\"educationDetail._source.duration\"></span></div>\n" +
    "      <div ng-if=\"educationDetail._source.activity\"><strong translate=\"educations.result.activity\"></strong> : <span ng-bind-html=\"educationDetail._source.activity\"></span></div>\n" +
    "      <div ng-if=\"educationDetail._source.cost\"><strong translate=\"educations.result.cost\"></strong> : <span ng-bind-html=\"educationDetail._source.cost\"></span></div>\n" +
    "      <div ng-if=\"educationDetail._source.languages\"><strong translate=\"educations.result.language\"></strong> : <span translate=\"educations.result.languages.{{checkLanguage(educationDetail._source.languages)}}\"></span></div>\n" +
    "\n" +
    "      <div ng-if=\"educations.result.target\">\n" +
    "        <strong translate=\"educations.result.target\"></strong>\n" +
    "        <p ng-bind-html=\"educationDetail._source.target\"></p>\n" +
    "      </div>\n" +
    "      <div ng-if=\"educations.result.preconditions\">\n" +
    "        <strong translate=\"educations.result.preconditions\"></strong>\n" +
    "        <p ng-bind-html=\"educationDetail._source.preconditions\"></p>\n" +
    "      </div>\n" +
    "      <div>\n" +
    "        <strong translate=\"educations.result.degree\"></strong>\n" +
    "      </div>\n" +
    "\n" +
    "      <div ng-if=\"educationDetail._source.comments.class || educationDetail._source.comments.offers\">\n" +
    "        <strong translate=\"educations.result.comments\"></strong>\n" +
    "        <p ng-bind-html=\"educationDetail._source.comments.class\"></p>\n" +
    "        <p ng-bind-html=\"educationDetail._source.comments.offers\"></p>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div layout=\"row\" layout-sm=\"column\" layout-align=\"space-around\">\n" +
    "      <md-progress-circular md-mode=\"indeterminate\" md-diameter=\"60\"></md-progress-circular>\n" +
    "    </div>\n" +
    "\n" +
    "  </md-dialog-content>\n" +
    "</md-dialog>\n" +
    "\n"
  );


  $templateCache.put('views/template/job-detail.html',
    "<!-- layout-xs=\"column\" -->\n" +
    "<div ng-class=\"{visited: isVisited(jobDetail._source.jobId)}\" layout=\"row\" layout-wrap layout-align=\"space-between start\" style=\"padding: 10px;\">\n" +
    "  <!-- JOB ID : for debug purposes -->\n" +
    "  <span ng-show=\"false\">{{::jobDetail._source.jobId}}</span>\n" +
    "  <div flex flex-xs=\"100\" flex-order-xs=\"2\">\n" +
    "      <strong class=\"strong\">{{::getMultiLanguageText(jobDetail._source.title)}}&nbsp;</strong>\n" +
    "      <span ng-if=\"!containsQuota(getMultiLanguageText(jobDetail._source.title))\">\n" +
    "        <strong ng-if=\"jobDetail._source.quotaFrom!==jobDetail._source.quotaTo\">{{::jobDetail._source.quotaFrom}} - {{::jobDetail._source.quotaTo}}%</strong>\n" +
    "        <strong ng-if=\"jobDetail._source.quotaFrom===jobDetail._source.quotaTo\">{{::jobDetail._source.quotaTo}}%</strong>\n" +
    "      </span>&nbsp;\n" +
    "      <span ng-if=\"onlineSinceDate(jobDetail._source.publicationDate)>1\" translate=\"jobs.result.onlineSince\" translate-values=\"{value: onlineSinceDate(jobDetail._source.publicationDate)}\"></span>\n" +
    "      <span ng-if=\"onlineSinceDate(jobDetail._source.publicationDate)===1\" translate=\"jobs.result.onlineSinceOneDay\"></span>\n" +
    "      &nbsp;\n" +
    "      <span ng-if=\"sorting==='3' || sorting==='4'\" translate=\"jobs.search.distance\" translate-values=\"{value:formatDistance(jobDetail.sort[0])}\"></span>\n" +
    "\n" +
    "      <p ng-if=\"!showDetailContent\" ng-text-truncate=\"formatTextToShow(getMultiLanguageText(jobDetail._source.description))\" ng-tt-words-threshold=\"20\" ng-tt-no-toggling></p>\n" +
    "\n" +
    "      <div ng-if=\"showDetailContent\" class=\"jd-job-detail\">\n" +
    "\n" +
    "        <span ng-switch=\"jobDetail._source.external\">\n" +
    "\n" +
    "          <!--Internal Jobs -->\n" +
    "          <span ng-switch-when=\"false\">\n" +
    "\n" +
    "            <p ng-bind-html=\"formatTextToShow(getMultiLanguageText(jobDetail._source.description))\"></p>\n" +
    "            <div layout=\"row\" layout-wrap layout-align=\"space-between start\">\n" +
    "              <div flex=\"25\" flex-xs=\"100\">\n" +
    "                <strong class=\"fake-label\" translate=\"jobs.result.jobLocation\"></strong><br />\n" +
    "                <span>{{::getMultiLanguageText(jobDetail._source.location.remarks)}}</span><br />\n" +
    "\n" +
    "                <strong class=\"fake-label\" translate=\"jobs.result.entryDate\"></strong><br />\n" +
    "                <span ng-if=\"jobDetail._source.availableNow\" translate=\"jobs.result.availableNow\"></span>\n" +
    "                <span ng-if=\"!jobDetail._source.availableNow && jobDetail._source.startDate\" translate=\"jobs.result.availableFromDate\" translate-values=\"{value: formatDate(jobDetail._source.startDate)}\"></span>\n" +
    "                <span ng-if=\"!jobDetail._source.availableNow && !jobDetail._source.startDate\" translate=\"jobs.result.availableByAppointment\"></span>\n" +
    "                <br />\n" +
    "\n" +
    "                <strong class=\"fake-label\" translate=\"jobs.result.contractDuration\"></strong><br />\n" +
    "                <span ng-if=\"jobDetail._source.endDate\" translate=\"jobs.result.untilDate\" translate-values=\"{value: formatDate(jobDetail._source.endDate)}\"></span>\n" +
    "                <span ng-if=\"!jobDetail._source.endDate\" translate=\"jobs.result.permanent\"></span>\n" +
    "              </div>\n" +
    "\n" +
    "              <!-- Sprachen -->\n" +
    "              <div flex=\"25\" flex-xs=\"100\">\n" +
    "                <div ng-repeat=\"language in jobDetail._source.languages\" ng-if=\"language.languageCode\">\n" +
    "                  <strong class=\"fake-label\" translate=\"language.jobs.{{::language.languageCode}}\"></strong><br />\n" +
    "                  (<span translate=\"jobs.result.spoken\"></span>: <span translate=\"global.codes.languages.skills.{{::language.spokenCode}}\"></span> / <span translate=\"jobs.result.written\"></span>: <span translate=\"global.codes.languages.skills.{{::language.writtenCode}}\"></span>)\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "              <!-- Bewerbung -->\n" +
    "              <div flex=\"25\" flex-xs=\"100\">\n" +
    "                <div ng-if=\"jobDetail._source.application.written\">\n" +
    "                  <strong class=\"fake-label\" translate=\"jobs.result.titleWrittenApplication\"></strong><br />\n" +
    "                  <span translate=\"jobs.result.letterApplication\"></span>\n" +
    "                </div>\n" +
    "                <div ng-if=\"jobDetail._source.application.electronical\">\n" +
    "                  <strong class=\"fake-label\" translate=\"jobs.result.titleElectronicApplication\"></strong><br />\n" +
    "                  <span>{{jobDetail._source.contact.eMail}} <span ng-if=\"jobDetail._source.company.url\">/ {{::jobDetail._source.company.url}}</span></span>\n" +
    "                </div>\n" +
    "                <div ng-if=\"jobDetail._source.application.phone\">\n" +
    "                  <strong class=\"fake-label\" translate=\"jobs.result.titlePhoneApplication\"></strong><br />\n" +
    "                  <span>{{jobDetail._source.contact.phone}}</span>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "              <div flex=\"25\" flex-xs=\"100\">\n" +
    "                <strong>{{::jobDetail._source.company.name}}</strong><br />\n" +
    "                <span>{{::jobDetail._source.company.address.street}}</span><br />\n" +
    "                <span>{{::jobDetail._source.company.address.zip}} {{::jobDetail._source.company.address.location}}</span><br />\n" +
    "                <span ng-if=\"jobDetail._source.company.poAddress.poBox\"><br /><span translate=\"jobs.result.poBox\" translate-values=\"{value: jobDetail._source.company.poAddress.poBox}\"></span><br /></span>\n" +
    "                <span ng-if=\"jobDetail._source.company.poAddress.poBox\">{{::jobDetail._source.company.poAddress.zip}} {{::jobDetail._source.company.poAddress.location}}</span>\n" +
    "\n" +
    "                <br />\n" +
    "                <strong><span translate=\"global.codes.salutations.{{::jobDetail._source.contact.gender}}\"></span> {{::jobDetail._source.contact.firstName}} {{::jobDetail._source.contact.lastName}}</strong><br />\n" +
    "                <span ng-if=\"jobDetail._source.contact.phone\">{{::jobDetail._source.contact.phone}}<br /></span>\n" +
    "                <span ng-if=\"jobDetail._source.contact.eMail\">{{::jobDetail._source.contact.eMail}}</span>\n" +
    "\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </span>\n" +
    "\n" +
    "          <!--External Jobs-->\n" +
    "          <span ng-switch-when=\"true\">\n" +
    "            <p ng-bind-html=\"formatTextToShow(getMultiLanguageText(jobDetail._source.description))\"></p>\n" +
    "            <div layout=\"row\" layout-wrap layout-align=\"space-between start\">\n" +
    "              <div flex=\"25\" flex-xs=\"100\">\n" +
    "                <strong class=\"fake-label\" translate=\"jobs.result.jobLocation\"></strong><br />\n" +
    "                <span>{{::getMultiLanguageText(jobDetail._source.location.remarks)}}</span><br />\n" +
    "\n" +
    "                <strong>{{::jobDetail._source.company.name}}</strong>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </span>\n" +
    "        </span>\n" +
    "      </div>\n" +
    "\n" +
    "  </div>\n" +
    "  <!-- todo style: layout-margin flex-xs=\"100\" flex-order-xs=\"1\" ng-class=\"{'jd-mobile':mobile}\" -->\n" +
    "  <div flex=\"20\" flex-xs=\"100\" flex-order-xs=\"1\" ng-class=\"{'jd-mobile':isMobile}\">\n" +
    "    <md-button ng-click=\"showDetail(jobDetail._source.jobId)\" aria-label=\"Show / Close Detail\" class=\"jd-show-btn\" ng-class=\"{'md-raised jd-btn-block':!isMobile}\">\n" +
    "      <span ng-show=\"!showDetailContent\">\n" +
    "        <md-icon>search</md-icon>&nbsp;<span translate=\"jobs.result.showMore\"></span>\n" +
    "      </span>\n" +
    "      <span ng-show=\"showDetailContent\">\n" +
    "        <md-icon>close</md-icon>&nbsp;<span translate=\"jobs.result.showLess\"></span>\n" +
    "      </span>\n" +
    "    </md-button>\n" +
    "\n" +
    "    <md-button hide-xs ng-click=\"showPrintDialog(jobDetail._source.jobId)\" class=\"md-raised jd-btn-block\"><md-icon>print</md-icon>&nbsp;<span translate=\"jobs.result.print\"></span></md-button>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<md-divider></md-divider>\n"
  );


  $templateCache.put('views/template/job-list.html',
    "<md-dialog aria-label=\"Job List\" ng-cloak>\n" +
    "  <form>\n" +
    "    <md-toolbar>\n" +
    "      <div class=\"md-toolbar-tools\">\n" +
    "        <h2 translate=\"isco.majorGroups.{{level}}\"></h2>\n" +
    "        <span flex></span>\n" +
    "        <md-button class=\"md-icon-button\" ng-click=\"hide()\">\n" +
    "          <md-icon aria-label=\"Close dialog\">close</md-icon>\n" +
    "        </md-button>\n" +
    "      </div>\n" +
    "    </md-toolbar>\n" +
    "    <md-dialog-content>\n" +
    "      <div class=\"md-dialog-content\">\n" +
    "        <div layout=\"row\" layout-wrap layout-margin layout-align=\"space-between center\" width=\"100%\">\n" +
    "          <a ng-click=\"answer(minorGroup)\" layout=\"row\" layout-align=\"start center\" flex=\"30\" flex-xs=\"100\" class=\"jd-job-list\" ng-repeat=\"minorGroup in iscoMinorGroups[level] track by $index\" >\n" +
    "            <md-icon>arrow_forward</md-icon>&nbsp;<span flex translate=\"isco.minorGroups.{{minorGroup}}\"></span>\n" +
    "          </a>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </md-dialog-content>\n" +
    "    <md-dialog-actions layout=\"row\">\n" +
    "      <md-button ng-click=\"hide()\">\n" +
    "        <span translate=\"jobs.search.close\"></span>\n" +
    "      </md-button>\n" +
    "    </md-dialog-actions>\n" +
    "  </form>\n" +
    "</md-dialog>\n"
  );


  $templateCache.put('views/template/job-print.html',
    "<md-dialog>\n" +
    "  <md-toolbar>\n" +
    "    <div class=\"md-toolbar-tools\">\n" +
    "      <h2><span translate=\"jobs.result.print\"></span></h2>\n" +
    "      <span flex></span>\n" +
    "    </div>\n" +
    "  </md-toolbar>\n" +
    "  <md-dialog-content>\n" +
    "    <div id=\"printableArea\">\n" +
    "\n" +
    "      <div ng-switch=\"jobDetail._source.external\">\n" +
    "\n" +
    "        <!--Internal Jobs-->\n" +
    "        <div ng-switch-when=\"false\">\n" +
    "\n" +
    "          <strong>{{::getMultiLanguageText(jobDetail._source.title)}}</strong><br />\n" +
    "          <span translate=\"jobs.result.onlineSinceDate\" translate-values=\"{value: formatDate(jobDetail._source.publicationDate)}\"></span>\n" +
    "          /\n" +
    "          <span translate=\"jobs.result.workload\"></span>\n" +
    "          <span ng-if=\"jobDetail._source.quotaFrom!==jobDetail._source.quotaTo\">{{::jobDetail._source.quotaFrom}} - {{::jobDetail._source.quotaTo}}%</span>\n" +
    "          <span ng-if=\"jobDetail._source.quotaFrom===jobDetail._source.quotaTo\">{{::jobDetail._source.quotaTo}}%</span>\n" +
    "\n" +
    "          <p ng-bind-html=\"formatTextToPrint(getMultiLanguageText(jobDetail._source.description))\"></p>\n" +
    "          <strong class=\"fake-label\" translate=\"jobs.result.jobLocation\"></strong> :\n" +
    "          <span>{{::getMultiLanguageText(jobDetail._source.location.remarks)}}</span><br />\n" +
    "\n" +
    "          <strong class=\"fake-label\" translate=\"jobs.result.entryDate\"></strong> :\n" +
    "          <span ng-if=\"jobDetail._source.availableNow\" translate=\"jobs.result.availableNow\"></span>\n" +
    "          <span ng-if=\"!jobDetail._source.availableNow && jobDetail._source.startDate\" translate=\"jobs.result.availableFromDate\" translate-values=\"{value: formatDate(jobDetail._source.startDate)}\"></span>\n" +
    "          <span ng-if=\"!jobDetail._source.availableNow && !jobDetail._source.startDate\" translate=\"jobs.result.availableByAppointment\"></span>\n" +
    "          <br />\n" +
    "\n" +
    "          <strong class=\"fake-label\" translate=\"jobs.result.contractDuration\"></strong> :\n" +
    "          <span ng-if=\"jobDetail._source.endDate\" translate=\"jobs.result.untilDate\" translate-values=\"{value: formatDate(jobDetail._source.endDate)}\"></span>\n" +
    "          <span ng-if=\"!jobDetail._source.endDate\" translate=\"jobs.result.permanent\"></span>\n" +
    "\n" +
    "        <!-- Sprachen -->\n" +
    "          <div ng-repeat=\"language in jobDetail._source.languages\" ng-if=\"language.languageCode\">\n" +
    "            <strong class=\"fake-label\" translate=\"language.jobs.{{language.languageCode}}\"></strong> :\n" +
    "            (<span translate=\"jobs.result.spoken\"></span>: <span translate=\"global.codes.languages.skills.{{language.spokenCode}}\"></span> / <span translate=\"jobs.result.written\"></span>: <span translate=\"global.codes.languages.skills.{{language.writtenCode}}\"></span>)\n" +
    "          </div>\n" +
    "\n" +
    "        <!-- Bewerbung -->\n" +
    "          <div ng-if=\"jobDetail._source.application.written\">\n" +
    "            <strong class=\"fake-label\" translate=\"jobs.result.titleWrittenApplication\"></strong> :\n" +
    "            <span translate=\"jobs.result.letterApplication\"></span>\n" +
    "          </div>\n" +
    "          <div ng-if=\"jobDetail._source.application.electronical\">\n" +
    "            <strong class=\"fake-label\" translate=\"jobs.result.titleElectronicApplication\"></strong> :\n" +
    "            <span>{{::jobDetail._source.contact.eMail}} <span ng-if=\"jobDetail._source.company.url\">/ {{::jobDetail._source.company.url}}</span></span>\n" +
    "          </div>\n" +
    "          <div ng-if=\"jobDetail._source.application.phone\">\n" +
    "            <strong class=\"fake-label\" translate=\"jobs.result.titlePhoneApplication\"></strong> :\n" +
    "            <span>{{::jobDetail._source.contact.phone}}</span>\n" +
    "          </div>\n" +
    "\n" +
    "          <br />\n" +
    "          <strong>{{::jobDetail._source.company.name}}</strong><br />\n" +
    "          <span>{{::jobDetail._source.company.address.street}}</span><br />\n" +
    "          <span>{{::jobDetail._source.company.address.zip}} {{::jobDetail._source.company.address.location}}</span><br />\n" +
    "          <span ng-if=\"jobDetail._source.company.poAddress.poBox\"><br /><span translate=\"jobs.result.poBox\" translate-values=\"{value: jobDetail._source.company.poAddress.poBox}\"></span><br /></span>\n" +
    "          <span ng-if=\"jobDetail._source.company.poAddress.poBox\">{{::jobDetail._source.company.poAddress.zip}} {{::jobDetail._source.company.poAddress.location}}</span>\n" +
    "\n" +
    "          <strong><span translate=\"global.codes.salutations.{{jobDetail._source.contact.gender}}\"></span> {{::jobDetail._source.contact.firstName}} {{::jobDetail._source.contact.lastName}}</strong><br />\n" +
    "          <span ng-if=\"jobDetail._source.contact.phone\">{{::jobDetail._source.contact.phone}}<br /></span>\n" +
    "          <span ng-if=\"jobDetail._source.contact.eMail\">{{::jobDetail._source.contact.eMail}}</span>\n" +
    "        </div>\n" +
    "\n" +
    "        <!--External Jobs-->\n" +
    "        <div ng-switch-when=\"true\">\n" +
    "\n" +
    "          <strong>{{::getMultiLanguageText(jobDetail._source.title)}}</strong><br />\n" +
    "          <span translate=\"jobs.result.onlineSinceDate\" translate-values=\"{value: formatDate(jobDetail._source.publicationDate)}\"></span>\n" +
    "          /\n" +
    "          <span translate=\"jobs.result.workload\"></span>\n" +
    "          <span ng-if=\"jobDetail._source.quotaFrom!==jobDetail._source.quotaTo\">{{::jobDetail._source.quotaFrom}} - {{::jobDetail._source.quotaTo}}%</span>\n" +
    "          <span ng-if=\"jobDetail._source.quotaFrom===jobDetail._source.quotaTo\">{{::jobDetail._source.quotaTo}}%</span>\n" +
    "\n" +
    "          <p ng-bind-html=\"formatTextToPrint(getMultiLanguageText(jobDetail._source.description))\"></p>\n" +
    "          <strong class=\"fake-label\" translate=\"jobs.result.jobLocation\"></strong> :\n" +
    "          <span>{{::getMultiLanguageText(jobDetail._source.location.remarks)}}</span><br />\n" +
    "\n" +
    "          <strong>{{::jobDetail._source.company.name}}</strong>\n" +
    "        </div>\n" +
    "\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div layout=\"row\" layout-sm=\"column\" layout-align=\"center center\">\n" +
    "      <md-progress-circular md-mode=\"indeterminate\" md-diameter=\"120\"></md-progress-circular>\n" +
    "    </div>\n" +
    "  </md-dialog-content>\n" +
    "</md-dialog>\n"
  );

}]);
