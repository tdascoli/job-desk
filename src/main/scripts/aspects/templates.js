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


  $templateCache.put('template/help.html',
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


  $templateCache.put('template/job-detail.html',
    "<div layout=\"row\" layout-wrap layout-align=\"space-between start\" style=\"padding: 10px;\">\n" +
    "  <div flex flex-sm=\"100\" ng-click=\"showDetail($event,jobDetail._source)\">\n" +
    "      <h4 class=\"strong\">{{::getMultiLanguageText(jobDetail._source.title)}}</h4>\n" +
    "      <strong ng-if=\"onlineSinceDate(jobDetail._source.publicationDate)>1\" translate=\"jobs.result.onlineSince\" translate-values=\"{value: onlineSinceDate(jobDetail._source.publicationDate)}\"></strong>\n" +
    "      <strong ng-if=\"onlineSinceDate(jobDetail._source.publicationDate)===1\" translate=\"jobs.result.onlineSinceOneDay\"></strong>\n" +
    "      /\n" +
    "      <strong translate=\"jobs.result.workload\"></strong>\n" +
    "      <strong ng-if=\"jobDetail._source.quotaFrom!==jobDetail._source.quotaTo\">{{::jobDetail._source.quotaFrom}} - {{::jobDetail._source.quotaTo}}%</strong>\n" +
    "      <strong ng-if=\"jobDetail._source.quotaFrom===jobDetail._source.quotaTo\">{{::jobDetail._source.quotaTo}}%</strong>\n" +
    "\n" +
    "      <p ng-if=\"!showDetailContent\" ng-text-truncate=\"getMultiLanguageText(jobDetail._source.description)\" ng-tt-words-threshold=\"20\" ng-tt-no-toggling></p>\n" +
    "\n" +
    "      <div ng-if=\"showDetailContent\">\n" +
    "\n" +
    "        <span ng-switch=\"jobDetail._source.external\">\n" +
    "\n" +
    "          <!--Internal Jobs -->\n" +
    "          <span ng-switch-when=\"false\">\n" +
    "\n" +
    "            <p ng-bind-html=\"getMultiLanguageText(jobDetail._source.description)\"></p>\n" +
    "            <div layout=\"row\" layout-wrap layout-align=\"space-between start\">\n" +
    "              <div flex=\"25\" flex-sm=\"100\">\n" +
    "                <strong class=\"fake-label\" translate=\"jobs.result.jobLocation\"></strong><br />\n" +
    "                <span>{{::getMultiLanguageText(jobDetail._source.location.remarks)}}</span><br />\n" +
    "\n" +
    "                <strong class=\"fake-label\" translate=\"jobs.result.entryDate\"></strong><br />\n" +
    "                <span ng-if=\"jobDetail._source.availableNow\" translate=\"jobs.result.availableNow\"></span>\n" +
    "                <span ng-if=\"!jobDetail._source.availableNow && jobDetail._source.startDate\" translate=\"jobs.result.availableFromDate\" translate-values=\"{value: jobDetail._source.startDate}\"></span>\n" +
    "                <span ng-if=\"!jobDetail._source.availableNow && !jobDetail._source.startDate\" translate=\"jobs.result.availableByAppointment\"></span>\n" +
    "                <br />\n" +
    "\n" +
    "                <strong class=\"fake-label\" translate=\"jobs.result.contractDuration\"></strong><br />\n" +
    "                <span ng-if=\"!jobDetail._source.permanentJob && jobDetail._source.endDate\" translate=\"untilDate\" translate-values=\"{value: jobDetail._source.endDate}\"></span>\n" +
    "                <span ng-if=\"!jobDetail._source.permanentJob && !jobDetail._source.endDate\" translate=\"jobs.result.nonPermanent\"></span>\n" +
    "                <span ng-if=\"jobDetail._source.permanentJob\" translate=\"jobs.result.permanent\"></span>\n" +
    "              </div>\n" +
    "\n" +
    "              <!-- Sprachen -->\n" +
    "              <div flex=\"25\" flex-sm=\"100\">\n" +
    "                <div ng-repeat=\"language in jobDetail._source.languages\" ng-if=\"language.languageCode\">\n" +
    "                  <strong class=\"fake-label\" translate=\"language.jobs.{{::language.languageCode}}\"></strong><br />\n" +
    "                  (<span translate=\"jobs.result.spoken\"></span>: <span translate=\"global.codes.languages.skills.{{::language.spokenCode}}\"></span> / <span translate=\"jobs.result.written\"></span>: <span translate=\"global.codes.languages.skills.{{::language.writtenCode}}\"></span>)\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "              <!-- Bewerbung -->\n" +
    "              <div flex=\"25\" flex-sm=\"100\">\n" +
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
    "              <div flex=\"25\" flex-sm=\"100\">\n" +
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
    "              </div>\n" +
    "            </div>\n" +
    "          </span>\n" +
    "\n" +
    "          <!--External Jobs-->\n" +
    "          <span ng-switch-when=\"true\">\n" +
    "\n" +
    "            <p ng-bind-html=\"getMultiLanguageText(jobDetail._source.description)\"></p>\n" +
    "            <div layout=\"row\" layout-wrap layout-align=\"space-between start\">\n" +
    "              <div flex=\"25\" flex-sm=\"100\">\n" +
    "                <strong class=\"fake-label\" translate=\"jobs.result.jobLocation\"></strong><br />\n" +
    "                <span>{{::getMultiLanguageText(jobDetail._source.location.remarks)}}</span><br />\n" +
    "\n" +
    "                <strong class=\"fake-label\" translate=\"jobs.result.entryDate\"></strong><br />\n" +
    "                <span ng-if=\"jobDetail._source.availableNow\" translate=\"jobs.result.availableNow\"></span>\n" +
    "                <span ng-if=\"!jobDetail._source.availableNow && jobDetail._source.startDate\" translate=\"jobs.result.availableFromDate\" translate-values=\"{value: jobDetail._source.startDate}\"></span>\n" +
    "                <span ng-if=\"!jobDetail._source.availableNow && !jobDetail._source.startDate\" translate=\"jobs.result.availableByAppointment\"></span>\n" +
    "                <br />\n" +
    "\n" +
    "                <strong class=\"fake-label\" translate=\"jobs.result.contractDuration\"></strong><br />\n" +
    "                <span ng-if=\"!jobDetail._source.permanentJob && jobDetail._source.endDate\" translate=\"untilDate\" translate-values=\"{value: jobDetail._source.endDate}\"></span>\n" +
    "                <span ng-if=\"!jobDetail._source.permanentJob && !jobDetail._source.endDate\" translate=\"jobs.result.nonPermanent\"></span>\n" +
    "                <span ng-if=\"jobDetail._source.permanentJob\" translate=\"jobs.result.permanent\"></span><br />\n" +
    "\n" +
    "                <strong>{{::jobDetail._source.company.name}}</strong><br />\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </span>\n" +
    "        </span>\n" +
    "      </div>\n" +
    "\n" +
    "    </div>\n" +
    "  <div flex=\"20\" hide-sm>\n" +
    "    <md-button ng-click=\"showDetail($event,jobDetail._source)\" aria-label=\"Show / Close Detail\">\n" +
    "      <span ng-if=\"!showDetailContent\">\n" +
    "        <md-icon>search</md-icon>&nbsp;<span translate=\"jobs.result.showMore\"></span>\n" +
    "      </span>\n" +
    "      <span ng-if=\"showDetailContent\">\n" +
    "        <md-icon>close</md-icon>&nbsp;<span translate=\"jobs.result.showLess\"></span>\n" +
    "      </span>\n" +
    "    </md-button>\n" +
    "    <p></p>\n" +
    "    <md-button ng-click=\"showPrintDialog()\"><md-icon>print</md-icon>&nbsp;<span translate=\"jobs.result.print\"></span></md-button>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<md-divider></md-divider>\n"
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
    "          <span ng-if=\"onlineSinceDate(jobDetail._source.publicationDate)>1\" translate=\"jobs.result.onlineSince\" translate-values=\"{value: onlineSinceDate(jobDetail._source.publicationDate)}\"></span>\n" +
    "          <span ng-if=\"onlineSinceDate(jobDetail._source.publicationDate)===1\" translate=\"jobs.result.onlineSinceOneDay\"></span>\n" +
    "          /\n" +
    "          <span translate=\"jobs.result.workload\"></span>\n" +
    "          <span ng-if=\"jobDetail._source.quotaFrom!==jobDetail._source.quotaTo\">{{::jobDetail._source.quotaFrom}} - {{::jobDetail._source.quotaTo}}%</span>\n" +
    "          <span ng-if=\"jobDetail._source.quotaFrom===jobDetail._source.quotaTo\">{{::jobDetail._source.quotaTo}}%</span>\n" +
    "\n" +
    "          <p ng-bind-html=\"formatText(getMultiLanguageText(jobDetail._source.description))\"></p>\n" +
    "          <strong class=\"fake-label\" translate=\"jobs.result.jobLocation\"></strong> :\n" +
    "          <span>{{::getMultiLanguageText(jobDetail._source.location.remarks)}}</span><br />\n" +
    "\n" +
    "          <strong class=\"fake-label\" translate=\"jobs.result.entryDate\"></strong> :\n" +
    "          <span ng-if=\"jobDetail._source.availableNow\" translate=\"jobs.result.availableNow\"></span>\n" +
    "          <span ng-if=\"!jobDetail._source.availableNow && jobDetail._source.startDate\" translate=\"jobs.result.availableFromDate\" translate-values=\"{value: jobDetail._source.startDate}\"></span>\n" +
    "          <span ng-if=\"!jobDetail._source.availableNow && !jobDetail._source.startDate\" translate=\"jobs.result.availableByAppointment\"></span>\n" +
    "          <br />\n" +
    "\n" +
    "          <strong class=\"fake-label\" translate=\"jobs.result.contractDuration\"></strong> :\n" +
    "          <span ng-if=\"!jobDetail._source.permanentJob && jobDetail._source.endDate\" translate=\"untilDate\" translate-values=\"{value: jobDetail._source.endDate}\"></span>\n" +
    "          <span ng-if=\"!jobDetail._source.permanentJob && !jobDetail._source.endDate\" translate=\"jobs.result.nonPermanent\"></span>\n" +
    "          <span ng-if=\"jobDetail._source.permanentJob\" translate=\"jobs.result.permanent\"></span>\n" +
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
    "          <span ng-if=\"onlineSinceDate(jobDetail._source.publicationDate)>1\" translate=\"jobs.result.onlineSince\" translate-values=\"{value: onlineSinceDate(jobDetail._source.publicationDate)}\"></span>\n" +
    "          <span ng-if=\"onlineSinceDate(jobDetail._source.publicationDate)===1\" translate=\"jobs.result.onlineSinceOneDay\"></span>\n" +
    "          /\n" +
    "          <span translate=\"jobs.result.workload\"></span>\n" +
    "          <span ng-if=\"jobDetail._source.quotaFrom!==jobDetail._source.quotaTo\">{{::jobDetail._source.quotaFrom}} - {{::jobDetail._source.quotaTo}}%</span>\n" +
    "          <span ng-if=\"jobDetail._source.quotaFrom===jobDetail._source.quotaTo\">{{::jobDetail._source.quotaTo}}%</span>\n" +
    "\n" +
    "          <p ng-bind-html=\"formatText(getMultiLanguageText(jobDetail._source.description))\"></p>\n" +
    "          <strong class=\"fake-label\" translate=\"jobs.result.jobLocation\"></strong> :\n" +
    "          <span>{{::getMultiLanguageText(jobDetail._source.location.remarks)}}</span><br />\n" +
    "\n" +
    "          <strong class=\"fake-label\" translate=\"jobs.result.entryDate\"></strong> :\n" +
    "          <span ng-if=\"jobDetail._source.availableNow\" translate=\"jobs.result.availableNow\"></span>\n" +
    "          <span ng-if=\"!jobDetail._source.availableNow && jobDetail._source.startDate\" translate=\"jobs.result.availableFromDate\" translate-values=\"{value: jobDetail._source.startDate}\"></span>\n" +
    "          <span ng-if=\"!jobDetail._source.availableNow && !jobDetail._source.startDate\" translate=\"jobs.result.availableByAppointment\"></span>\n" +
    "          <br />\n" +
    "\n" +
    "          <strong class=\"fake-label\" translate=\"jobs.result.contractDuration\"></strong> :\n" +
    "          <span ng-if=\"!jobDetail._source.permanentJob && jobDetail._source.endDate\" translate=\"untilDate\" translate-values=\"{value: jobDetail._source.endDate}\"></span>\n" +
    "          <span ng-if=\"!jobDetail._source.permanentJob && !jobDetail._source.endDate\" translate=\"jobs.result.nonPermanent\"></span>\n" +
    "          <span ng-if=\"jobDetail._source.permanentJob\" translate=\"jobs.result.permanent\"></span><br />\n" +
    "\n" +
    "          <strong>{{::jobDetail._source.company.name}}</strong>\n" +
    "        </div>\n" +
    "\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div layout=\"row\" layout-sm=\"column\" layout-align=\"space-around\">\n" +
    "      <md-progress-circular md-mode=\"indeterminate\" md-diameter=\"60\"></md-progress-circular>\n" +
    "    </div>\n" +
    "  </md-dialog-content>\n" +
    "</md-dialog>\n"
  );


  $templateCache.put('template/numeric.html',
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


  $templateCache.put('template/results.html',
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
