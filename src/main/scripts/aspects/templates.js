angular.module('job-desk').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('template/apprenticeship-detail.html',
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


  $templateCache.put('template/apprenticeship-print.html',
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


  $templateCache.put('template/core/language-switcher.html',
    "<md-select ng-model=\"currentLanguage\" aria-label=\"current language\">\n" +
    "  <md-option ng-click=\"changeLanguage(language)\" ng-value=\"language\" ng-repeat=\"language in allLanguages\">{{ language }}</md-option>\n" +
    "</md-select>\n"
  );


  $templateCache.put('template/education-detail.html',
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


  $templateCache.put('template/education-print.html',
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


  $templateCache.put('template/job-detail.html',
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
    "      <span ng-if=\"sorting==='3' || sorting==='4'\" translate=\"jobs.search.circumSearch.label.distance\" translate-values=\"{value:formatDistance(jobDetail.sort[0])}\"></span>\n" +
    "\n" +
    "    <p ng-if=\"!showDetailContent\" ng-text-truncate=\"formatTextToShow(getMultiLanguageText(jobDetail._source.description))\" ng-tt-words-threshold=\"20\" ng-tt-no-toggling></p>\n" +
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
    "            <div layout=\"row\" layout-wrap layout-align=\"start\">\n" +
    "              <div flex=\"40\" flex-xs=\"100\">\n" +
    "                <strong class=\"fake-label\" translate=\"jobs.result.jobLocation\"></strong><br />\n" +
    "                <span>{{::getMultiLanguageText(jobDetail._source.location.remarks)}}</span><br />\n" +
    "\n" +
    "                <strong>{{::jobDetail._source.company.name}}</strong>\n" +
    "              </div>\n" +
    "              <!-- Sprachen -->\n" +
    "              <div flex=\"25\" flex-xs=\"100\" ng-if=\"jobDetail._source.languages.length > 0\">\n" +
    "                <strong class=\"fake-label\" translate=\"language.title\"></strong>\n" +
    "                <ul>\n" +
    "                  <div ng-repeat=\"language in jobDetail._source.languages\" ng-if=\"language.languageCode\">\n" +
    "                    <li><span translate=\"language.jobs.{{::language.languageCode}}\"></span></li>\n" +
    "                  </div>\n" +
    "                </ul>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </span>\n" +
    "        </span>\n" +
    "      </div>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "  <div flex=\"25\" flex-xs=\"100\" flex-order-xs=\"1\" ng-class=\"{'jd-mobile':isMobile}\">\n" +
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


  $templateCache.put('template/job-list.html',
    "<md-dialog aria-label=\"Category List\" ng-cloak class=\"jd-job-list-dialog\">\n" +
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
    "        <div layout=\"row\" layout-padding layout-wrap width=\"100%\">\n" +
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


  $templateCache.put('template/job-mobile-filter.html',
    "<md-bottom-sheet class=\"md-list\" ng-cloak>\n" +
    "  <md-list>\n" +
    "    <md-list-item class=\"md-2-line\">\n" +
    "      <md-input-container flex=\"100\" class=\"md-block isco-select\" ng-if=\"!searchParams.iscoMajorGroup\">\n" +
    "        <label><span translate=\"jobs.search.jobgroup\"></span></label>\n" +
    "        <md-select ng-model=\"searchParams.iscoMajorGroup\" ng-change=\"countJobs()\" md-container-class=\"jd-selectpicker\">\n" +
    "          <md-option ng-repeat=\"isco in iscoMajorGroup\" value=\"{{isco.code}}\"><span translate=\"{{isco.text}}\"></span></md-option>\n" +
    "        </md-select>\n" +
    "      </md-input-container>\n" +
    "\n" +
    "      <md-input-container flex=\"100\" class=\"md-block isco-select\" ng-if=\"searchParams.iscoMajorGroup\">\n" +
    "        <label><span translate=\"isco.majorGroups.{{searchParams.iscoMajorGroup}}\"></span></label>\n" +
    "        <md-select ng-model=\"searchParams.iscoGroupLevel3\" ng-change=\"countJobs()\" md-container-class=\"jd-selectpicker\">\n" +
    "          <md-option value=\"0\"><md-icon>done_all</md-icon> <span class=\"jd-select-reset\" translate=\"jobs.search.allSubGroups\"></span></md-option>\n" +
    "          <md-option ng-repeat=\"minorGroup in iscoMinorGroups[searchParams.iscoMajorGroup]\" value=\"{{minorGroup}}\"><span translate=\"isco.minorGroups.{{minorGroup}}\"></span></md-option>\n" +
    "          <md-option value=\"-1\" ng-click=\"searchParams.iscoMajorGroup='';searchParams.iscoGroupLevel3='';countJobs()\"><md-icon>keyboard_arrow_left</md-icon><span class=\"jd-select-reset\" translate=\"jobs.search.disableGroup\"></span></md-option>\n" +
    "        </md-select>\n" +
    "      </md-input-container>\n" +
    "    </md-list-item>\n" +
    "    <md-list-item class=\"md-3-line\">\n" +
    "      <div flex=\"20\">\n" +
    "        <md-button class=\"md-icon-button jd-icon-button\" ng-click=\"setMyLocation()\">\n" +
    "          <md-icon id=\"resetLocation\">my_location</md-icon>\n" +
    "        </md-button>\n" +
    "      </div>\n" +
    "\n" +
    "      <md-input-container flex=\"60\">\n" +
    "        <label translate=\"jobs.search.location\"></label>\n" +
    "        <input type=\"number\" min=\"1000\" max=\"9999\" name=\"location-sm\" id=\"location-sm\" ng-model=\"currentZip\" />\n" +
    "      </md-input-container>\n" +
    "\n" +
    "\n" +
    "      <div flex=\"20\">\n" +
    "        <md-button class=\"md-icon-button jd-icon-button\" ng-click=\"setCurrentZip(false)\">\n" +
    "          <md-icon>check</md-icon>\n" +
    "        </md-button>\n" +
    "      </div>\n" +
    "    </md-list-item>\n" +
    "\n" +
    "    <md-list-item class=\"md-2-line\">\n" +
    "      <md-select aria-label=\"distance\" flex=\"100\" ng-model=\"searchParams.distanceType\" ng-change=\"countJobs()\" ng-init=\"searchParams.distanceType=searchParams.distanceType || appConfig.distanceType || 'distance'\">\n" +
    "        <md-option value=\"distance\" class=\"md-primary\" aria-label=\"distance\" ng-if=\"appConfig.availableDistanceType.distance\"><span translate=\"jobs.search.circumSearch.type.distance\"></span></md-option>\n" +
    "        <md-option value=\"transport\" class=\"md-primary\" aria-label=\"travel time\" ng-if=\"appConfig.availableDistanceType.transport\"><span translate=\"jobs.search.circumSearch.type.transport\"></span></md-option>\n" +
    "        <md-option value=\"drive\" class=\"md-primary\" aria-label=\"travel time\" ng-if=\"appConfig.availableDistanceType.drive\"><span translate=\"jobs.search.circumSearch.type.drive\"></span></md-option>\n" +
    "        <md-option value=\"bike\" class=\"md-primary\" aria-label=\"travel time\" ng-if=\"appConfig.availableDistanceType.bike\"><span translate=\"jobs.search.circumSearch.type.bike\"></span></md-option>\n" +
    "      </md-select>\n" +
    "    </md-list-item>\n" +
    "\n" +
    "    <md-list-item class=\"md-2-line\">\n" +
    "      <div flex=\"100\">\n" +
    "        <label ng-if=\"searchParams.distanceType==='distance'\" class=\"md-slider-label\" translate=\"jobs.search.circumSearch.label.{{searchParams.distanceType}}\" translate-values=\"{value:searchParams.{{searchParams.distanceType}}}\"></label>\n" +
    "        <label ng-if=\"searchParams.distanceType!=='distance'\" class=\"md-slider-label\" translate=\"jobs.search.circumSearch.label.{{searchParams.distanceType}}\" translate-values=\"{value:showTimeInH(searchParams.{{searchParams.distanceType}})}\"></label>\n" +
    "        <md-slider ng-model=\"searchParams[searchParams.distanceType]\" step=\"{{sliderOptions[searchParams.distanceType].step}}\" min=\"{{sliderOptions[searchParams.distanceType].min}}\" max=\"{{sliderOptions[searchParams.distanceType].max}}\" aria-label=\"distance\" ng-change=\"countJobs()\" class=\"md-primary\"></md-slider>\n" +
    "      </div>\n" +
    "    </md-list-item>\n" +
    "\n" +
    "  </md-list>\n" +
    "</md-bottom-sheet>\n"
  );


  $templateCache.put('template/job-print.html',
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
    "          <!-- Sprachen -->\n" +
    "          <div ng-if=\"jobDetail._source.languages.length > 0\">\n" +
    "            <strong class=\"fake-label\" translate=\"language.title\"></strong>\n" +
    "            <ul>\n" +
    "              <div ng-repeat=\"language in jobDetail._source.languages\" ng-if=\"language.languageCode\">\n" +
    "                <li><span translate=\"language.jobs.{{::language.languageCode}}\"></span></li>\n" +
    "              </div>\n" +
    "            </ul>\n" +
    "          </div>\n" +
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


  $templateCache.put('template/swissdoc-list.html',
    "<md-dialog aria-label=\"Category List\" ng-cloak class=\"jd-job-list-dialog\">\n" +
    "  <form>\n" +
    "    <md-toolbar>\n" +
    "      <div class=\"md-toolbar-tools\">\n" +
    "        <h2 translate=\"swissdoc.0-{{level}}00-0-0\"></h2>\n" +
    "        <span flex></span>\n" +
    "        <md-button class=\"md-icon-button\" ng-click=\"hide()\">\n" +
    "          <md-icon aria-label=\"Close dialog\">close</md-icon>\n" +
    "        </md-button>\n" +
    "      </div>\n" +
    "    </md-toolbar>\n" +
    "    <md-dialog-content>\n" +
    "      <div class=\"md-dialog-content\">\n" +
    "        <div layout=\"row\" layout-padding layout-wrap width=\"100%\">\n" +
    "          <a ng-click=\"answer(minorGroup.code)\" layout=\"row\" layout-align=\"start center\" flex=\"30\" flex-xs=\"100\" class=\"jd-job-list\" ng-repeat=\"minorGroup in swissdocGroupLevel2[level] track by $index\" >\n" +
    "            <md-icon>arrow_forward</md-icon>&nbsp;<span flex translate=\"{{minorGroup.text}}\"></span>\n" +
    "          </a>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </md-dialog-content>\n" +
    "    <md-dialog-actions layout=\"row\">\n" +
    "      <md-button ng-click=\"hide()\">\n" +
    "        <span translate=\"global.tour.close\"></span>\n" +
    "      </md-button>\n" +
    "    </md-dialog-actions>\n" +
    "  </form>\n" +
    "</md-dialog>\n"
  );

}]);
