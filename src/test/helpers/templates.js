angular.module('job-desk').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/content/apprenticeships/apprenticeships.html',
    "<div layout=\"column\">\n" +
    "  <md-grid-list md-cols-sm=\"1\" md-cols=\"3\" md-gutter=\"{{searchRowGutter}}\" md-row-height=\"{{searchRowHeight}}\">\n" +
    "\n" +
    "    <md-grid-tile ng-click=\"setSwissdocGroup('1')\">\n" +
    "      <img id=\"step5\" class=\"category\" src=\"assets/images/512/family3.png\" alt=\"toggeli 1\" />\n" +
    "      <md-grid-tile-footer>\n" +
    "        <h3 translate=\"swissdoc.category1\"></h3>\n" +
    "      </md-grid-tile-footer>\n" +
    "    </md-grid-tile>\n" +
    "    <md-grid-tile ng-click=\"setSwissdocGroup('2')\">\n" +
    "      <img class=\"category\" src=\"assets/images/512/graduated.png\" alt=\"toggeli 1\" />\n" +
    "      <md-grid-tile-footer>\n" +
    "        <h3 translate=\"swissdoc.category2\"></h3>\n" +
    "      </md-grid-tile-footer>\n" +
    "    </md-grid-tile>\n" +
    "    <md-grid-tile ng-click=\"setSwissdocGroup('3')\">\n" +
    "      <img class=\"category\" src=\"assets/images/512/tool36.png\" alt=\"toggeli 1\" />\n" +
    "      <md-grid-tile-footer>\n" +
    "        <h3 translate=\"swissdoc.category3\"></h3>\n" +
    "      </md-grid-tile-footer>\n" +
    "    </md-grid-tile>\n" +
    "\n" +
    "    <md-grid-tile ng-click=\"setSwissdocGroup('4')\">\n" +
    "      <img class=\"category\" src=\"assets/images/512/paperclip.png\" alt=\"toggeli 1\" />\n" +
    "      <md-grid-tile-footer>\n" +
    "        <h3 translate=\"swissdoc.category4\"></h3>\n" +
    "      </md-grid-tile-footer>\n" +
    "    </md-grid-tile>\n" +
    "    <md-grid-tile ng-click=\"setSwissdocGroup('5')\">\n" +
    "      <img class=\"category\" src=\"assets/images/512/shop31.png\" alt=\"toggeli 1\" />\n" +
    "      <md-grid-tile-footer>\n" +
    "        <h3 translate=\"swissdoc.category5\"></h3>\n" +
    "      </md-grid-tile-footer>\n" +
    "    </md-grid-tile>\n" +
    "    <md-grid-tile ng-click=\"setSwissdocGroup('6')\">\n" +
    "      <img class=\"category iscoIcon\" src=\"assets/images/jobs/isco6.png\" alt=\"toggeli 1\" />\n" +
    "      <md-grid-tile-footer>\n" +
    "        <h3 translate=\"swissdoc.category6\"></h3>\n" +
    "      </md-grid-tile-footer>\n" +
    "    </md-grid-tile>\n" +
    "\n" +
    "    <md-grid-tile ng-click=\"setSwissdocGroup('7')\">\n" +
    "      <img class=\"category\" src=\"assets/images/512/work26.png\" alt=\"toggeli 1\" />\n" +
    "      <md-grid-tile-footer>\n" +
    "        <h3 translate=\"swissdoc.category7\"></h3>\n" +
    "      </md-grid-tile-footer>\n" +
    "    </md-grid-tile>\n" +
    "    <md-grid-tile ng-click=\"setSwissdocGroup('8')\">\n" +
    "      <img class=\"category\" src=\"assets/images/512/construction16.png\" alt=\"toggeli 1\" />\n" +
    "      <md-grid-tile-footer>\n" +
    "        <h3 translate=\"swissdoc.category8\"></h3>\n" +
    "      </md-grid-tile-footer>\n" +
    "    </md-grid-tile>\n" +
    "\n" +
    "  </md-grid-list>\n" +
    "</div>\n" +
    "\n" +
    "<md-button href=\"#/apprenticeship-search\" class=\"md-fab md-primary md-fab-bottom-right jd-floating-fab\" aria-label=\"global.navigation.search\">\n" +
    "  <md-icon>arrow_forward</md-icon>\n" +
    "</md-button>\n"
  );


  $templateCache.put('views/content/apprenticeships/result.html',
    "<div id=\"filter\" layout=\"row\" layout-margin layout-align=\"space-between center\" class=\"md-whiteframe-z2 jd-floating-toolbar\">\n" +
    "  <div flex=\"25\" flex-sm=\"100\">\n" +
    "    <md-input-container class=\"md-select-has-label\">\n" +
    "      <label translate=\"apprenticeships.result.sorting\"></label>\n" +
    "      <md-select ng-model=\"sort\" ng-change=\"sortResultList()\">\n" +
    "        <md-option ng-repeat=\"sort in sortList\" value=\"{{$index}}\"><span translate=\"{{sort.text}}\"></span></md-option>\n" +
    "      </md-select>\n" +
    "    </md-input-container>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div apprenticeship-detail=\"detail\" ng-repeat=\"detail in apprenticeships\"></div>\n"
  );


  $templateCache.put('views/content/apprenticeships/search.html',
    "<div id=\"filter\" layout=\"row\" layout-wrap layout-margin layout-align=\"start center\" class=\"md-whiteframe-z2 jd-floating-toolbar jd-floating-toolbar-fill-sm\">\n" +
    "\n" +
    "  <div flex=\"15\" flex-sm=\"100\">\n" +
    "      <strong translate=\"apprenticeships.search.foundJobs\" translate-values=\"{value: count}\"></strong>\n" +
    "  </div>\n" +
    "\n" +
    "  <div flex=\"25\" flex-sm=\"100\" class=\"form-block\">\n" +
    "\n" +
    "    <md-select ng-model=\"searchParams.swissdocMajorGroup\" ng-change=\"countStellen()\" ng-if=\"!searchParams.swissdocMajorGroup\">\n" +
    "      <md-select-label ng-if=\"!searchParams.swissdocMajorGroup\"><span translate=\"apprenticeships.search.swissdocGroup\"></span></md-select-label>\n" +
    "      <md-option ng-repeat=\"swissdoc in swissdocMajorGroup\" value=\"{{swissdoc.code}}\"><span translate=\"{{swissdoc.text}}\"></span></md-option>\n" +
    "    </md-select>\n" +
    "\n" +
    "    <md-input-container class=\"md-select-has-label\" ng-if=\"searchParams.swissdocMajorGroup\">\n" +
    "      <label translate=\"swissdoc.category{{searchParams.swissdocMajorGroup}}\"></label>\n" +
    "\n" +
    "      <md-select ng-model=\"searchParams.swissdocGroupLevel2\" ng-change=\"countStellen()\">\n" +
    "        <md-option value=\"\"><span translate=\"apprenticeships.search.allSubGroups\"></span></md-option>\n" +
    "        <md-option ng-repeat=\"swissdoc2 in swissdocGroupLevel2[searchParams.iscoMajorGroup]\" value=\"{{swissdoc2.code}}\"><span translate=\"{{swissdoc2.text}}\"></span></md-option>\n" +
    "      </md-select>\n" +
    "    </md-input-container>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "  <div flex=\"15\" flex-sm=\"100\">\n" +
    "    <md-input-container>\n" +
    "      <label translate=\"apprenticeships.search.location\"></label>\n" +
    "      <input class=\"keyboard\" type=\"text\" name=\"location\" id=\"location\" ng-model=\"nearestZip\" />\n" +
    "    </md-input-container>\n" +
    "  </div>\n" +
    "\n" +
    "  <div flex=\"10\" flex-sm=\"50\">\n" +
    "    <md-input-container flex class=\"md-slider-has-label\">\n" +
    "      <label translate=\"apprenticeships.search.distance\" translate-values=\"{value:searchParams.distance}\"></label>\n" +
    "      <md-slider ng-model=\"searchParams.distance\" step=\"{{distanceOptions.step}}\" min=\"{{distanceOptions.min}}\"\n" +
    "                 max=\"{{distanceOptions.max}}\" aria-label=\"distance\" ng-change=\"countStellen()\"></md-slider>\n" +
    "    </md-input-container>\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div align=\"center\" hide-sm>\n" +
    "  <swiss-map id=\"map\"></swiss-map>\n" +
    "</div>\n" +
    "\n" +
    "<md-button href=\"#/apprenticeship-results\" class=\"md-fab md-primary md-fab-bottom-right jd-floating-fab\" aria-label=\"global.navigation.search\" ng-disabled=\"count===0\">\n" +
    "  <md-icon>arrow_forward</md-icon>\n" +
    "</md-button>\n"
  );


  $templateCache.put('views/content/educations/educations.html',
    "<div class=\"navigation filter row\" id=\"filter\">\n" +
    "  <div class=\"col-md-3\">\n" +
    "    <br />\n" +
    "    <a href=\"#/jobs\" class=\"btn btn-block btn-plain jobs\" glyph-icon=\"home\"> <strong translate=\"global.jobs\"></strong></a>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-3\">\n" +
    "    <br />\n" +
    "    <a href=\"#/apprenticeships\" class=\"btn btn-default btn-block btn-plain lena\" glyph-icon=\"arrow-top\" admin-symbol> <strong translate=\"global.apprenticeships\"></strong></a>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-6\">\n" +
    "    <div class=\"navbar-right\">\n" +
    "      <language-switcher></language-switcher>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "<div class=\"row navigation bottom\" id=\"navbottom\">\n" +
    "  <div class=\"col-md-offset-1 col-md-2\" align=\"center\">\n" +
    "    <a class=\"btn btn-default btn-plain btn-block\" href=\"#/frontpage\" glyph-icon=\"info-sign\"> <span translate=\"global.navigation.localInfo\"></span></a>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-offset-6 col-md-2\" align=\"center\">\n" +
    "    <a class=\"btn btn-default btn-primary btn-plain btn-block\" href=\"#/education-search\" translate=\"global.navigation.search\"></a>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-1\" align=\"right\">\n" +
    "    <help></help>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('views/content/error/error.html',
    "<div ng-cloak>\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-12\">\n" +
    "            <h1 translate=\"errors.title\">Error Page!</h1>\n" +
    "\n" +
    "            <div ng-show=\"errorMessage\">\n" +
    "                <div class=\"alert alert-danger\" translate=\"{{errorMessage}}\" >\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('views/content/jobs/jobs.html',
    "<div layout=\"column\">\n" +
    "  <md-grid-list md-cols-sm=\"1\" md-cols=\"3\" md-gutter=\"{{searchRowGutter}}\" md-row-height=\"{{searchRowHeight}}\">\n" +
    "\n" +
    "    <md-grid-tile ng-click=\"setIscoGroup('1')\">\n" +
    "      <img id=\"step5\" class=\"category\" src=\"assets/images/512/family3.png\" alt=\"toggeli 1\" />\n" +
    "      <md-grid-tile-footer>\n" +
    "        <h3 translate=\"isco.category1\"></h3>\n" +
    "      </md-grid-tile-footer>\n" +
    "    </md-grid-tile>\n" +
    "    <md-grid-tile ng-click=\"setIscoGroup('2')\">\n" +
    "      <img class=\"category\" src=\"assets/images/512/graduated.png\" alt=\"toggeli 1\" />\n" +
    "      <md-grid-tile-footer>\n" +
    "        <h3 translate=\"isco.category2\"></h3>\n" +
    "      </md-grid-tile-footer>\n" +
    "    </md-grid-tile>\n" +
    "    <md-grid-tile ng-click=\"setIscoGroup('3')\">\n" +
    "      <img class=\"category\" src=\"assets/images/512/tool36.png\" alt=\"toggeli 1\" />\n" +
    "      <md-grid-tile-footer>\n" +
    "        <h3 translate=\"isco.category3\"></h3>\n" +
    "      </md-grid-tile-footer>\n" +
    "    </md-grid-tile>\n" +
    "\n" +
    "    <md-grid-tile ng-click=\"setIscoGroup('4')\">\n" +
    "      <img class=\"category\" src=\"assets/images/512/paperclip.png\" alt=\"toggeli 1\" />\n" +
    "      <md-grid-tile-footer>\n" +
    "        <h3 translate=\"isco.category4\"></h3>\n" +
    "      </md-grid-tile-footer>\n" +
    "    </md-grid-tile>\n" +
    "    <md-grid-tile ng-click=\"setIscoGroup('5')\">\n" +
    "      <img class=\"category\" src=\"assets/images/512/shop31.png\" alt=\"toggeli 1\" />\n" +
    "      <md-grid-tile-footer>\n" +
    "        <h3 translate=\"isco.category5\"></h3>\n" +
    "      </md-grid-tile-footer>\n" +
    "    </md-grid-tile>\n" +
    "    <md-grid-tile ng-click=\"setIscoGroup('6')\">\n" +
    "      <img class=\"category iscoIcon\" src=\"assets/images/jobs/isco6.png\" alt=\"toggeli 1\" />\n" +
    "      <md-grid-tile-footer>\n" +
    "        <h3 translate=\"isco.category6\"></h3>\n" +
    "      </md-grid-tile-footer>\n" +
    "    </md-grid-tile>\n" +
    "\n" +
    "    <md-grid-tile ng-click=\"setIscoGroup('7')\">\n" +
    "      <img class=\"category\" src=\"assets/images/512/work26.png\" alt=\"toggeli 1\" />\n" +
    "      <md-grid-tile-footer>\n" +
    "        <h3 translate=\"isco.category7\"></h3>\n" +
    "      </md-grid-tile-footer>\n" +
    "    </md-grid-tile>\n" +
    "    <md-grid-tile ng-click=\"setIscoGroup('8')\">\n" +
    "      <img class=\"category\" src=\"assets/images/512/construction16.png\" alt=\"toggeli 1\" />\n" +
    "      <md-grid-tile-footer>\n" +
    "        <h3 translate=\"isco.category8\"></h3>\n" +
    "      </md-grid-tile-footer>\n" +
    "    </md-grid-tile>\n" +
    "    <md-grid-tile ng-click=\"setIscoGroup('9')\">\n" +
    "      <img class=\"category\" src=\"assets/images/512/clean9.png\" alt=\"toggeli 1\" />\n" +
    "      <md-grid-tile-footer>\n" +
    "        <h3 translate=\"isco.category9\"></h3>\n" +
    "      </md-grid-tile-footer>\n" +
    "    </md-grid-tile>\n" +
    "\n" +
    "  </md-grid-list>\n" +
    "</div>\n" +
    "\n" +
    "<md-button href=\"#/job-search\" class=\"md-fab md-primary md-fab-bottom-right jd-floating-fab\" aria-label=\"global.navigation.search\">\n" +
    "  <md-icon>arrow_forward</md-icon>\n" +
    "</md-button>\n"
  );


  $templateCache.put('views/content/jobs/result.html',
    "<div id=\"filter\" layout=\"row\" layout-margin layout-align=\"space-between center\" class=\"md-whiteframe-z2 jd-floating-toolbar\">\n" +
    "  <div flex=\"25\" flex-sm=\"100\">\n" +
    "    <md-input-container class=\"md-select-has-label\">\n" +
    "      <label translate=\"jobs.result.sorting\"></label>\n" +
    "      <md-select ng-model=\"sort\" ng-change=\"sortResultList()\">\n" +
    "        <md-option ng-repeat=\"sort in sortList\" value=\"{{$index}}\"><span translate=\"{{sort.text}}\"></span></md-option>\n" +
    "      </md-select>\n" +
    "    </md-input-container>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div job-detail=\"jobDetail\" ng-repeat=\"jobDetail in jobs\"></div>\n"
  );


  $templateCache.put('views/content/jobs/search.html',
    "<div id=\"filter\" layout=\"row\" layout-wrap layout-margin layout-align=\"start center\" class=\"md-whiteframe-z2 jd-floating-toolbar jd-floating-toolbar-fill-sm\">\n" +
    "\n" +
    "  <div flex=\"15\" flex-sm=\"100\">\n" +
    "      <strong translate=\"jobs.search.foundJobs\" translate-values=\"{value: count}\"></strong>\n" +
    "  </div>\n" +
    "\n" +
    "  <div flex=\"25\" flex-sm=\"100\" class=\"form-block\">\n" +
    "\n" +
    "    <md-select ng-model=\"searchParams.iscoMajorGroup\" ng-change=\"countStellen()\" ng-if=\"!searchParams.iscoMajorGroup\">\n" +
    "      <md-select-label ng-if=\"!searchParams.iscoMajorGroup\"><span translate=\"jobs.search.jobgroup\"></span></md-select-label>\n" +
    "      <md-option ng-repeat=\"isco in iscoMajorGroup\" value=\"{{isco.code}}\"><span translate=\"{{isco.text}}\"></span></md-option>\n" +
    "    </md-select>\n" +
    "\n" +
    "    <md-input-container class=\"md-select-has-label\" ng-if=\"searchParams.iscoMajorGroup\">\n" +
    "      <label translate=\"isco.category{{searchParams.iscoMajorGroup}}\"></label>\n" +
    "\n" +
    "      <md-select ng-model=\"searchParams.iscoGroupLevel2\" ng-change=\"countStellen()\">\n" +
    "        <md-option value=\"\"><span translate=\"jobs.search.allSubGroups\"></span></md-option>\n" +
    "        <md-option ng-repeat=\"isco2 in iscoGroupLevel2[searchParams.iscoMajorGroup]\" value=\"{{isco2.code}}\"><span translate=\"{{isco2.text}}\"></span></md-option>\n" +
    "      </md-select>\n" +
    "    </md-input-container>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "  <div flex=\"15\" flex-sm=\"100\">\n" +
    "    <md-input-container>\n" +
    "      <label translate=\"jobs.search.location\"></label>\n" +
    "      <input class=\"keyboard\" type=\"text\" name=\"location\" id=\"location\" ng-model=\"nearestZip\" />\n" +
    "    </md-input-container>\n" +
    "  </div>\n" +
    "\n" +
    "  <div flex=\"10\" flex-sm=\"50\">\n" +
    "    <md-input-container flex class=\"md-slider-has-label\">\n" +
    "      <label translate=\"jobs.search.distance\" translate-values=\"{value:searchParams.distance}\"></label>\n" +
    "      <md-slider ng-model=\"searchParams.distance\" step=\"{{distanceOptions.step}}\" min=\"{{distanceOptions.min}}\"\n" +
    "                 max=\"{{distanceOptions.max}}\" aria-label=\"distance\" ng-change=\"countStellen()\"></md-slider>\n" +
    "    </md-input-container>\n" +
    "  </div>\n" +
    "\n" +
    "  <div flex=\"10\" flex-sm=\"50\">\n" +
    "    <md-input-container flex class=\"md-slider-has-label\">\n" +
    "      <label ng-show=\"searchParams.distance>1\" translate=\"jobs.search.onlineSince\"\n" +
    "             translate-values=\"{value:searchParams.onlineSince}\"></label>\n" +
    "      <label ng-show=\"searchParams.distance<2\" translate=\"jobs.search.onlineSinceOneDay\"></label>\n" +
    "      <md-slider ng-model=\"searchParams.onlineSince\" step=\"{{onlineSinceOptions.step}}\"\n" +
    "                 min=\"{{onlineSinceOptions.min}}\" max=\"{{onlineSinceOptions.max}}\" aria-label=\"onlineSince\"\n" +
    "                 ng-change=\"countStellen()\"></md-slider>\n" +
    "    </md-input-container>\n" +
    "  </div>\n" +
    "\n" +
    "  <div flex=\"15\" flex-sm=\"100\">\n" +
    "    <md-radio-group ng-model=\"searchParams.fulltime\" ng-change=\"countStellen()\">\n" +
    "      <md-radio-button value=\"1\"><span translate=\"jobs.search.allJobs\"></span></md-radio-button>\n" +
    "      <md-radio-button value=\"2\"><span translate=\"jobs.search.parttimeJobs\"></span></md-radio-button>\n" +
    "    </md-radio-group>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div align=\"center\" hide-sm>\n" +
    "  <swiss-map id=\"map\"></swiss-map>\n" +
    "</div>\n" +
    "\n" +
    "<md-button href=\"#/job-results\" class=\"md-fab md-primary md-fab-bottom-right jd-floating-fab\" aria-label=\"global.navigation.search\" ng-disabled=\"count===0\">\n" +
    "  <md-icon>arrow_forward</md-icon>\n" +
    "</md-button>\n"
  );


  $templateCache.put('views/content/localInfo/localInfo.html',
    "<div class=\"col-md-12\">\n" +
    "  <h1 style=\"margin-top: 10px; margin-bottom: 5px;\" translate=\"localInfo.title\"></h1>\n" +
    "  <hr style=\"margin-top: 5px;\" />\n" +
    "</div>\n"
  );


  $templateCache.put('views/template/apprenticeship-detail.html',
    "<div layout=\"row\" layout-wrap layout-align=\"space-between start\" style=\"padding: 10px;\">\n" +
    "  <div flex=\"80\" flex-sm=\"100\">\n" +
    "    <h4 class=\"strong\">{{getMultiLanguageText(apprenticeshipDetail._source.titleM)}}/{{getMultiLanguageText(apprenticeshipDetail._source.titleW)}} <span ng-if=\"apprenticeshipDetail._source.amount>1\" translate=\"apprenticeships.results.apprenticeshipAmount\" translate-values=\"value:apprenticeshipDetail._source.amount\"></span></h4>\n" +
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
    "  <div flex=\"15\" hide-sm>\n" +
    "    <md-button><md-icon>print</md-icon>&nbsp;<span translate=\"apprenticeships.result.print\"></span></md-button>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<md-divider></md-divider>\n"
  );


  $templateCache.put('views/template/core/language-switcher.html',
    "<md-select ng-model=\"currentLanguage\">\n" +
    "  <md-select-label><span translate=\"global.language\"></span></md-select-label>\n" +
    "  <md-option ng-click=\"setTranslationLanguage(language)\" ng-value=\"language\" ng-repeat=\"language in allLanguages\">{{ language }}</md-option>\n" +
    "</md-select>\n"
  );


  $templateCache.put('views/template/help.html',
    "<div id=\"help\">\n" +
    "    <svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"39px\" height=\"39px\" viewbox=\"0 0 39 39\" enable-background=\"new 0 0 39 39\" xml:space=\"preserve\">\n" +
    "        <g>\n" +
    "            <path style=\"fill: rgb(68, 141, 214);\" class=\"uv-bubble-background\" fill=\"rgba(46, 49, 51, 0.6)\" d=\"M31.425,34.514c-0.432-0.944-0.579-2.007-0.591-2.999c4.264-3.133,7.008-7.969,7.008-13.409\n" +
    "                C37.842,8.658,29.594,1,19.421,1S1,8.658,1,18.105c0,9.446,7.932,16.79,18.105,16.79c1.845,0,3.94,0.057,5.62-0.412\n" +
    "                c0.979,1.023,2.243,2.3,2.915,2.791c3.785,2.759,7.571,0,7.571,0S32.687,37.274,31.425,34.514z\"></path>\n" +
    "            <g>\n" +
    "                <g>\n" +
    "                    <path style=\"fill: white;\" class=\"uv-bubble-foreground\" fill=\"#FFFFFF\" d=\"M16.943,19.467c0-3.557,4.432-3.978,4.432-6.058c0-0.935-0.723-1.721-2.383-1.721\n" +
    "                        c-1.508,0-2.773,0.725-3.709,1.87l-2.441-2.743c1.598-1.9,4.01-2.924,6.602-2.924c3.891,0,6.271,1.959,6.271,4.765\n" +
    "                        c0,4.4-5.037,4.732-5.037,7.265c0,0.481,0.243,0.994,0.574,1.266l-3.316,0.965C17.303,21.459,16.943,20.522,16.943,19.467z\n" +
    "                         M16.943,26.19c0-1.326,1.114-2.441,2.44-2.441c1.327,0,2.442,1.115,2.442,2.441c0,1.327-1.115,2.441-2.442,2.441\n" +
    "                        C18.058,28.632,16.943,27.518,16.943,26.19z\"></path>\n" +
    "                </g>\n" +
    "            </g>\n" +
    "        </g>\n" +
    "    </svg>\n" +
    "</div>"
  );


  $templateCache.put('views/template/job-detail.html',
    "<div layout=\"row\" layout-wrap layout-align=\"space-between start\" style=\"padding: 10px;\">\n" +
    "<div flex=\"80\" flex-sm=\"100\" ng-click=\"showDetail()\">\n" +
    "    <h4 class=\"strong\">{{getMultiLanguageText(jobDetail._source.title)}}</h4>\n" +
    "\n" +
    "    <strong ng-show=\"jobDetail._source.onlineSince>1\" translate=\"jobs.result.onlineSince\" translate-values=\"{value: jobDetail._source.onlineSince}\"></strong>\n" +
    "    <strong ng-show=\"jobDetail._source.onlineSince===1\" translate=\"jobs.result.onlineSinceOneDay\"></strong>\n" +
    "    /\n" +
    "    <strong translate=\"jobs.result.workload\"></strong>\n" +
    "    <strong ng-if=\"jobDetail._source.quotaFrom!==jobDetail._source.quotaTo\">{{jobDetail._source.quotaFrom}} - {{jobDetail._source.quotaTo}}%</strong>\n" +
    "    <strong ng-if=\"jobDetail._source.quotaFrom===jobDetail._source.quotaTo\">{{jobDetail._source.quotaTo}}%</strong>\n" +
    "\n" +
    "    <p ng-show=\"!showDetailContent\" ng-text-truncate=\"getMultiLanguageText(jobDetail._source.description)\" ng-tt-words-threshold=\"20\" ng-tt-no-toggling></p>\n" +
    "\n" +
    "\n" +
    "    <div ng-show=\"showDetailContent\">\n" +
    "      <span ng-hide=\"jobDetail._source.external==='true'\">\n" +
    "        <p ng-bind-html=\"getMultiLanguageText(jobDetail._source.description)\"></p>\n" +
    "        <div layout=\"row\" layout-wrap layout-align=\"space-between start\">\n" +
    "          <div flex=\"25\" flex-sm=\"100\">\n" +
    "            <strong class=\"fake-label\" translate=\"jobs.result.jobLocation\"></strong><br />\n" +
    "            <span>{{getMultiLanguageText(jobDetail._source.locations.remarks)}}</span><br />\n" +
    "\n" +
    "            <strong class=\"fake-label\" translate=\"jobs.result.entryDate\"></strong><br />\n" +
    "            <span ng-if=\"jobDetail._source.availableNow\" translate=\"jobs.result.availableNow\"></span>\n" +
    "            <span ng-if=\"!jobDetail._source.availableNow && jobDetail._source.startDate\" translate=\"jobs.result.availableFromDate\" translate-values=\"{value: jobDetail._source.startDate}\"></span>\n" +
    "            <span ng-if=\"!jobDetail._source.availableNow && !jobDetail._source.startDate\" translate=\"jobs.result.availableByAppointment\"></span>\n" +
    "            <br />\n" +
    "\n" +
    "            <strong class=\"fake-label\" translate=\"jobs.result.contractDuration\"></strong><br />\n" +
    "            <span ng-if=\"!jobDetail._source.permanentJob && jobDetail._source.endDate\" translate=\"untilDate\" translate-values=\"{value: jobDetail._source.endDate}\"></span>\n" +
    "            <span ng-if=\"!jobDetail._source.permanentJob && !jobDetail._source.endDate\" translate=\"jobs.result.nonPermanent\"></span>\n" +
    "            <span ng-if=\"jobDetail._source.permanentJob\" translate=\"jobs.result.permanent\"></span>\n" +
    "          </div>\n" +
    "\n" +
    "          <!-- Sprachen -->\n" +
    "          <div flex=\"25\" flex-sm=\"100\">\n" +
    "            <div ng-repeat=\"language in jobDetail._source.languages\" ng-show=\"language.languageCode\">\n" +
    "              <strong class=\"fake-label\" translate=\"language.jobs.{{language.languageCode}}\"></strong><br />\n" +
    "              (<span translate=\"jobs.result.spoken\"></span>: <span translate=\"global.codes.languages.skills.{{language.spokenCode}}\"></span> / <span translate=\"jobs.result.written\"></span>: <span translate=\"global.codes.languages.skills.{{language.writtenCode}}\"></span>)\n" +
    "            </div>\n" +
    "          </div>\n" +
    "\n" +
    "          <!-- Bewerbung -->\n" +
    "          <div flex=\"25\" flex-sm=\"100\">\n" +
    "            <div ng-if=\"jobDetail._source.application.written\">\n" +
    "              <strong class=\"fake-label\" translate=\"jobs.result.titleWrittenApplication\"></strong><br />\n" +
    "              <span translate=\"jobs.result.letterApplication\"></span>\n" +
    "            </div>\n" +
    "            <div ng-if=\"jobDetail._source.application.electronical\">\n" +
    "              <strong class=\"fake-label\" translate=\"jobs.result.titleElectronicApplication\"></strong><br />\n" +
    "              <span>{{jobDetail._source.contact.eMail}} <span ng-if=\"jobDetail._source.company.url\">/ {{jobDetail._source.company.url}}</span></span>\n" +
    "            </div>\n" +
    "            <div ng-if=\"jobDetail._source.application.phone\">\n" +
    "              <strong class=\"fake-label\" translate=\"jobs.result.titlePhoneApplication\"></strong><br />\n" +
    "              <span>{{jobDetail._source.contact.phone}}</span>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div flex=\"25\" flex-sm=\"100\">\n" +
    "            <strong>{{jobDetail._source.company.name}}</strong><br />\n" +
    "            <span>{{jobDetail._source.company.address.street}}</span><br />\n" +
    "            <span>{{jobDetail._source.company.address.zip}} {{jobDetail._source.company.address.location}}</span><br />\n" +
    "            <span ng-if=\"jobDetail._source.company.poAddress.poBox\"><br /><span translate=\"jobs.result.poBox\" translate-values=\"{value: jobDetail._source.company.poAddress.poBox}\"></span><br /></span>\n" +
    "            <span ng-if=\"jobDetail._source.company.poAddress.poBox\">{{jobDetail._source.company.poAddress.zip}} {{jobDetail._source.company.poAddress.location}}</span>\n" +
    "\n" +
    "            <br />\n" +
    "            <strong><span translate=\"global.codes.salutations.{{jobDetail._source.contact.gender}}\"></span> {{jobDetail._source.contact.firstName}} {{jobDetail._source.contact.lastName}}</strong><br />\n" +
    "            <span ng-if=\"jobDetail._source.contact.phone\">{{jobDetail._source.contact.phone}}<br /></span>\n" +
    "            <span ng-if=\"jobDetail._source.contact.eMail\">{{jobDetail._source.contact.eMail}}</span>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </span>\n" +
    "\n" +
    "      <iframe class=\"job-result\" ng-show=\"jobDetail._source.external==='true'\" ng-src=\"{{getExternalUrl(jobDetail._source.url)}}\"></iframe>\n" +
    "    </div>\n" +
    "\n" +
    "  </div>\n" +
    "  <div flex=\"15\" hide-sm>\n" +
    "    <md-button ng-click=\"showDetail()\">\n" +
    "      <span ng-show=\"!showDetailContent\">\n" +
    "        <md-icon>search</md-icon>&nbsp;<span translate=\"jobs.result.showMore\"></span>\n" +
    "      </span>\n" +
    "      <span ng-show=\"showDetailContent\">\n" +
    "        <md-icon>close</md-icon>&nbsp;<span translate=\"jobs.result.showLess\"></span>\n" +
    "      </span>\n" +
    "    </md-button>\n" +
    "    <p></p>\n" +
    "    <md-button><md-icon>print</md-icon>&nbsp;<span translate=\"jobs.result.print\"></span></md-button>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<md-divider></md-divider>\n"
  );


  $templateCache.put('views/template/numeric.html',
    "<div>\n" +
    "\t<div class=\"button-wrapper\">\n" +
    "\t\t<button ng-key=\"1\">1</button>\n" +
    "\t\t<button ng-key=\"2\">2</button>\n" +
    "\t\t<button data-ng-key=\"3\">3</button>\n" +
    "\t\t<button data-ng-key=\"4\">4</button>\n" +
    "\t\t<button data-ng-key=\"5\">5</button>\n" +
    "\t\t<button data-ng-key=\"6\">6</button>\n" +
    "\t\t<button data-ng-key=\"7\">7</button>\n" +
    "\t\t<button data-ng-key=\"8\">8</button>\n" +
    "\t\t<button data-ng-key=\"9\">9</button>\n" +
    "\n" +
    "\t\t<button data-ng-key=\"0\" class=\"button-wide\">0</button>\n" +
    "        <button ng-click=\"setCoords()\" class=\"smaller primary\">Ok</button>\n" +
    "\n" +
    "        <button ng-click=\"closeNumpad()\" class=\"smaller\">Close</button>\n" +
    "        <button ng-click=\"clearNumpad()\" class=\"smaller\">Clear</button>\n" +
    "\t</div>\n" +
    "</div>\n"
  );


  $templateCache.put('views/template/results.html',
    "<div class=\"row\">\n" +
    "    <a href=\"#/detail/{{job.id}}\" class=\"job-result col-md-10\">\n" +
    "            <strong class=\"fake-label\">{{job.BEZEICHNUNG}} / #{{job.id}} / Online seit {{job.ONLINE_SEIT}} Tag(en) / {{job.PENSUM_BIS}}%</strong>\n" +
    "            <p ng-text-truncate=\"job.BESCHREIBUNG\" ng-tt-chars-threshold=\"200\" ng-tt-no-toggling></p>\n" +
    "    </a>\n" +
    "    <div class=\"cold-md-2\" align=\"center\">\n" +
    "        <button glyph-icon=\"print\" admin-symbol class=\"result-button btn-plain\"></button>\n" +
    "        <button ng-click=\"star(job.id)\" glyph-icon=\"star\" admin-symbol class=\"result-button btn-plain\" ng-class=\"{favorite: isStarred(job.id)}\"></button>\n" +
    "    </div>\n" +
    "</div>"
  );

}]);
