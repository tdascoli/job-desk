angular.module('job-desk').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('assets/templates/help.html',
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


  $templateCache.put('assets/templates/job-detail.html',
    "<div class=\"row\">\n" +
    "      <span class=\"job-result col-md-10\" ng-click=\"showDetail()\">\n" +
    "        <h4 class=\"strong\">{{getMultiLanguageText(jobDetail._source.title)}}</h4>\n" +
    "\n" +
    "        <strong ng-show=\"jobDetail._source.onlineSince>1\" translate=\"jobs.result.onlineSince\" translate-values=\"{value: jobDetail._source.onlineSince}\"></strong>\n" +
    "        <strong ng-show=\"jobDetail._source.onlineSince===1\" translate=\"jobs.result.onlineSinceOneDay\"></strong>\n" +
    "        /\n" +
    "        <strong translate=\"jobs.result.workload\"></strong>\n" +
    "        <strong ng-if=\"jobDetail._source.quotaFrom!==jobDetail._source.quotaTo\">{{jobDetail._source.quotaFrom}} - {{jobDetail._source.quotaTo}}%</strong>\n" +
    "        <strong ng-if=\"jobDetail._source.quotaFrom===jobDetail._source.quotaTo\">{{jobDetail._source.quotaTo}}%</strong>\n" +
    "\n" +
    "        <span ng-hide=\"jobDetail._source.externalSource===true\">\n" +
    "          <p ng-show=\"!showDetailContent\" ng-text-truncate=\"getMultiLanguageText(jobDetail._source.description)\" ng-tt-words-threshold=\"20\" ng-tt-no-toggling></p>\n" +
    "          <div ng-show=\"showDetailContent\">\n" +
    "            <p ng-bind-html=\"getMultiLanguageText(jobDetail._source.description)\"></p>\n" +
    "            <div class=\"row\">\n" +
    "              <div class=\"col-md-3\">\n" +
    "                <strong class=\"fake-label\" translate=\"jobs.result.jobLocation\"></strong>\n" +
    "                <p>{{getMultiLanguageText(jobDetail._source.locations.remarks)}}</p>\n" +
    "\n" +
    "                <strong class=\"fake-label\" translate=\"jobs.result.entryDate\"></strong>\n" +
    "                <p ng-if=\"jobDetail._source.availableNow\" translate=\"jobs.result.availableNow\"></p>\n" +
    "                <p ng-if=\"!jobDetail._source.availableNow && jobDetail._source.startDate\" translate=\"jobs.result.availableFromDate\" translate-values=\"{value: jobDetail._source.startDate}\"></p>\n" +
    "                <p ng-if=\"!jobDetail._source.availableNow && !jobDetail._source.startDate\" translate=\"jobs.result.availableByAppointment\"></p>\n" +
    "\n" +
    "                <strong class=\"fake-label\" translate=\"jobs.result.contractDuration\"></strong>\n" +
    "                <p ng-if=\"!jobDetail._source.permanentJob && jobDetail._source.endDate\" translate=\"untilDate\" translate-values=\"{value: jobDetail._source.endDate}\"></p>\n" +
    "                <p ng-if=\"!jobDetail._source.permanentJob && !jobDetail._source.endDate\" translate=\"jobs.result.nonPermanent\"></p>\n" +
    "                <p ng-if=\"jobDetail._source.permanentJob\" translate=\"jobs.result.permanent\"></p>\n" +
    "              </div>\n" +
    "\n" +
    "              <!-- Sprachen -->\n" +
    "              <div class=\"col-md-3\">\n" +
    "                <div ng-repeat=\"language in jobDetail._source.languages\" ng-show=\"language.languageCode\">\n" +
    "                  <strong class=\"fake-label\" translate=\"language.jobs.{{language.languageCode}}\"></strong><br />\n" +
    "                  (<span translate=\"jobs.result.spoken\"></span>: <span translate=\"global.codes.languages.skills.{{language.spokenCode}}\"></span> / <span translate=\"jobs.result.written\"></span>: <span translate=\"global.codes.languages.skills.{{language.writtenCode}}\"></span>)\n" +
    "                </div>\n" +
    "              </div>\n" +
    "\n" +
    "              <!-- Bewerbung -->\n" +
    "              <div class=\"col-md-3\">\n" +
    "                <div ng-if=\"jobDetail._source.application.written\">\n" +
    "                  <strong class=\"fake-label\" translate=\"jobs.result.titleWrittenApplication\"></strong>\n" +
    "                  <p translate=\"jobs.result.letterApplication\"></p>\n" +
    "                </div>\n" +
    "                <div ng-if=\"jobDetail._source.application.electronical\">\n" +
    "                  <strong class=\"fake-label\" translate=\"jobs.result.titleElectronicApplication\"></strong>\n" +
    "                  <p>{{jobDetail._source.contact.eMail}} <span ng-if=\"jobDetail._source.company.url\">/ {{jobDetail._source.company.url}}</span></p>\n" +
    "                </div>\n" +
    "                <div ng-if=\"jobDetail._source.application.phone\">\n" +
    "                  <strong class=\"fake-label\" translate=\"jobs.result.titlePhoneApplication\"></strong>\n" +
    "                  <p>{{jobDetail._source.contact.phone}}</p>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "              <div class=\"col-md-3\">\n" +
    "                <strong>{{jobDetail._source.company.name}}<br /></strong>\n" +
    "                <span>{{jobDetail._source.company.address.street}}<br /></span>\n" +
    "                <span>{{jobDetail._source.company.address.zip}} {{jobDetail._source.company.address.location}}<br /></span>\n" +
    "                <span ng-if=\"jobDetail._source.company.poAddress.poBox\"><br /><span translate=\"jobs.result.poBox\" translate-values=\"{value: jobDetail._source.company.poAddress.poBox}\"></span><br /></span>\n" +
    "                <span ng-if=\"jobDetail._source.company.poAddress.poBox\">{{jobDetail._source.company.poAddress.zip}} {{jobDetail._source.company.poAddress.location}}</span>\n" +
    "\n" +
    "                <br />\n" +
    "                <strong><span translate=\"global.codes.salutations.{{jobDetail._source.contact.gender}}\"></span> {{jobDetail._source.contact.firstName}} {{jobDetail._source.contact.lastName}}<br /></strong>\n" +
    "                <span ng-if=\"jobDetail._source.contact.phone\">{{jobDetail._source.contact.phone}}<br /></span>\n" +
    "                <span ng-if=\"jobDetail._source.contact.eMail\">{{jobDetail._source.contact.eMail}}</span>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </span>\n" +
    "\n" +
    "        <p ng-show=\"jobDetail._source.externalSource===true\">QUELLE EXTERN</p>\n" +
    "      </span>\n" +
    "\n" +
    "  <div class=\"col-md-2\" align=\"center\">\n" +
    "    <button glyph-icon=\"search\" admin-symbol class=\"btn-plain btn-block\" ng-click=\"showDetail()\" ng-show=\"!showDetailContent\">&nbsp;<span translate=\"jobs.result.showMore\"></span></button>\n" +
    "    <button glyph-icon=\"close\" admin-symbol class=\"btn-plain btn-block\" ng-click=\"showDetail()\" ng-show=\"showDetailContent\">&nbsp;<span translate=\"jobs.result.showLess\"></span></button>\n" +
    "    <p></p>\n" +
    "    <button glyph-icon=\"print\" admin-symbol class=\"btn-plain btn-block\">&nbsp;<span translate=\"jobs.result.print\"></span></button>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('assets/templates/numeric.html',
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


  $templateCache.put('assets/templates/results.html',
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


  $templateCache.put('views/content/apprenticeships/apprenticeships.html',
    "<div class=\"navigation filter row\" id=\"filter\">\n" +
    "  <div class=\"col-md-3\">\n" +
    "    <br />\n" +
    "    <a href=\"#/jobs\" class=\"btn btn-block btn-plain jobs\" glyph-icon=\"home\"> <strong translate=\"global.jobs\"></strong></a>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-3\">\n" +
    "    <br />\n" +
    "    <a href=\"#/educations\" class=\"btn btn-default btn-block btn-plain wab\" glyph-icon=\"arrow-top\" admin-symbol> <strong translate=\"global.educations\"></strong></a>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-6\">\n" +
    "    <div class=\"navbar-right\">\n" +
    "      <language-switcher></language-switcher>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"row category-groups no-filter\">\n" +
    "  <div class=\"col-md-4\">\n" +
    "    <a class=\"category-group\" ng-click=\"setSwissdocGroup('1')\"><img src=\"assets/images/512/leaf64.png\" alt=\"toggeli 1\" /></a><br />\n" +
    "    <strong translate=\"swissdoc.category1\"></strong>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-4\">\n" +
    "    <a class=\"category-group\" ng-click=\"setSwissdocGroup('2')\"><img src=\"assets/images/512/cutlery6.png\" alt=\"toggeli 2\" /></a><br />\n" +
    "    <strong translate=\"swissdoc.category2\"></strong>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-4\">\n" +
    "    <a class=\"category-group\" ng-click=\"setSwissdocGroup('3')\"><img src=\"assets/images/512/t-shirt5.png\" alt=\"toggeli 3\" /></a><br />\n" +
    "    <strong translate=\"swissdoc.category3\"></strong>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"row category-groups\">\n" +
    "  <div class=\"col-md-4\">\n" +
    "    <a class=\"category-group\" ng-click=\"setSwissdocGroup('4')\"><img src=\"assets/images/512/work26.png\" alt=\"toggeli 1\" /></a><br />\n" +
    "    <strong translate=\"swissdoc.category4\"></strong>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-4\">\n" +
    "    <a class=\"category-group\" ng-click=\"setSwissdocGroup('5')\"><img src=\"assets/images/512/computer209.png\" alt=\"toggeli 2\" /></a><br />\n" +
    "    <strong translate=\"swissdoc.category5\"></strong>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-4\">\n" +
    "    <a class=\"category-group\" ng-click=\"setSwissdocGroup('6')\"><img src=\"assets/images/512/offices.png\" alt=\"toggeli 3\" /></a><br />\n" +
    "    <strong translate=\"swissdoc.category6\"></strong>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"row category-groups\">\n" +
    "  <div class=\"col-md-4\">\n" +
    "    <a class=\"category-group\" ng-click=\"setSwissdocGroup('7')\"><img src=\"assets/images/512/books8.png\" alt=\"toggeli 1\" /></a><br />\n" +
    "    <strong translate=\"swissdoc.category7\"></strong>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-4\">\n" +
    "    <a class=\"category-group\" ng-click=\"setSwissdocGroup('8')\"><img src=\"assets/images/512/paint86.png\" alt=\"toggeli 1\" /></a><br />\n" +
    "    <strong translate=\"swissdoc.category8\"></strong>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"row navigation bottom\" id=\"navbottom\">\n" +
    "  <div class=\"col-md-offset-1 col-md-2\" align=\"center\">\n" +
    "    <a class=\"btn btn-default btn-plain btn-block\" href=\"#/frontpage\" glyph-icon=\"info-sign\"> <span translate=\"global.navigation.localInfo\"></span></a>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-offset-8 col-md-1\" align=\"right\">\n" +
    "    <help></help>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('views/content/apprenticeships/search.html',
    "<div class=\"navigation filter row\" id=\"filter\" flowtype min-font=\"1\" max-font=\"9999\" font-ratio=\"100\" line-ratio=\"1.45\" minimum=\"1\" maximum=\"9999\">\n" +
    "  <div class=\"col-md-4\">\n" +
    "    <div ng-if=\"!params.swissdoc\">\n" +
    "      <selectpicker form-label=\"job.search.jobgroup\" id=\"swissdoc\" options=\"swissdocCategory\" label-attribute=\"'text'\" value-attribute=\"'code'\" i18n-label=\"true\" ng-model=\"searchParams.swissdoc\" ng-change=\"countStellen()\"></selectpicker>\n" +
    "    </div>\n" +
    "    <div ng-if=\"params.swissdoc\">\n" +
    "      <selectpicker form-label=\"swissdoc.category{{params.swissdoc}}\" id=\"subswissdoc\" options=\"swissdoc[params.swissdoc]\" label-attribute=\"'text'\" value-attribute=\"'code'\" i18n-label=\"true\" ng-model=\"searchParams.swissdoc2\" ng-change=\"countStellen()\"></selectpicker>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-2 location-plz\">\n" +
    "    <input type=\"text\" readonly=\"true\" maxlength=\"4\" name=\"plz\" id=\"plz\" form-input form-label=\"jobs.search.where\" ng-model=\"nearestZip\" form-inset=\"search\" form-inset-action=\"showPLZNumpad()\" form-inset-btn />\n" +
    "  </div>\n" +
    "  <div class=\"col-md-2\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"umkreis\"><span translate=\"job.search.distance\" class=\"ng-scope\"></span> {{showDistanceInKM()}}</label>\n" +
    "      <slider id=\"umkreis\" ng-model=\"searchParams.km\" ng-mouseup=\"countStellen()\" min=\"kmOptions.min\" step=\"kmOptions.step\" max=\"kmOptions.max\" value=\"kmOptions.value\"></slider>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-md-2\">\n" +
    "    <strong>\n" +
    "      <span translate=\"jobs.search.foundJobs\"></span>: {{ count }}<img ng-if=\"idle\" alt=\"idle\" src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\" />\n" +
    "    </strong>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-10\">\n" +
    "    <swiss-map id=\"map\"></swiss-map>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"navigation bottom row\" id=\"navbottom\" hotkey=\"{b: ssiKeyStart}\">\n" +
    "  <div class=\"col-md-offset-1 col-md-2\">\n" +
    "    <a class=\"btn btn-default btn-plain btn-block\" href=\"#/{{searchType}}\" glyph-icon=\"arrow-left\" admin-symbol> <span translate=\"global.navigation.startpage\"></span></a>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-offset-6 col-md-2\" align=\"center\">\n" +
    "    <button primary=\"true\" class=\"btn-plain btn-block\" ng-click=\"executeSearch()\" ng-disabled=\"count===0 || idle\">\n" +
    "      <span translate=\"global.navigation.showJobs\"></span>\n" +
    "    </button>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-1\" align=\"right\">\n" +
    "    <help></help>\n" +
    "  </div>\n" +
    "</div>\n"
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


  $templateCache.put('views/content/jobs/detail.html',
    "<div class=\"navigation filter simple row\" id=\"filter\" flowtype min-font=\"1\" max-font=\"9999\" font-ratio=\"100\" line-ratio=\"1.45\" minimum=\"1\" maximum=\"9999\">\n" +
    "  <div class=\"col-md-2\">\n" +
    "    <br />\n" +
    "    <button ng-click=\"navigateToJob(false)\" ng-if=\"jobs.length>0\" class=\"btn-block btn-plain\" glyph-icon=\"chevron-left\"> <span translate=\"jobs.navigation.previousJob\"></span></button>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-2\">\n" +
    "    <br />\n" +
    "    <button ng-click=\"navigateToJob(true)\" ng-if=\"jobs.length>0\" class=\"btn-block btn-plain\" glyph-icon=\"chevron-right\" glyph-align=\"right\"><span translate=\"jobs.navigation.nextJob\"></span> </button>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-2\">\n" +
    "    <br />\n" +
    "    <button ng-click=\"ssiKeyPrint()\" glyph-icon=\"print\" admin-symbol class=\"btn-block btn-plain\"> <span translate=\"jobs.detail.print\"></span></button>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"job-results\">\n" +
    "  <div class=\"row\">\n" +
    "    <div class=\"col-md-12\">\n" +
    "      <h3>{{job.BEZEICHNUNG}}</h3>\n" +
    "      <p>{{job.BESCHREIBUNG}}</p>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"row\">\n" +
    "    <!-- INSERATE TEXT -->\n" +
    "    <div class=\"col-md-3\">\n" +
    "      <h4 translate=\"jobs.detail.title\"></h4>\n" +
    "      <strong class=\"fake-label\" translate=\"jobs.detail.arbeitsortText\"></strong>\n" +
    "      <p>{{job.ARBEITSORT_TEXT}}</p>\n" +
    "\n" +
    "      <strong class=\"fake-label\" translate=\"jobs.detail.pensum\"></strong>\n" +
    "      <p ng-if=\"job.PENSUM_VON!==job.PENSUM_BIS\">{{job.PENSUM_VON}} - {{job.PENSUM_BIS}}%</p>\n" +
    "      <p ng-if=\"job.PENSUM_VON===job.PENSUM_BIS\">{{job.PENSUM_BIS}}%</p>\n" +
    "\n" +
    "      <strong class=\"fake-label\" translate=\"jobs.detail.stellenantritt\"></strong>\n" +
    "      <p ng-if=\"job.AB_SOFORT_B\" translate=\"aux.Stellenantritt.1\"></p>\n" +
    "      <p ng-if=\"!job.AB_SOFORT_B && job.STELLENANTRITT\">{{job.STELLENANTRITT}}</p>\n" +
    "      <p ng-if=\"!job.AB_SOFORT_B && !job.STELLENANTRITT\" translate=\"aux.Stellenantritt.0\"></p>\n" +
    "\n" +
    "      <strong class=\"fake-label\" translate=\"jobs.detail.vertragsdauer\"></strong>\n" +
    "      <p ng-if=\"!job.UNBEFRISTET_B && job.VERTRAGSDAUER\">befristet bis {{job.VERTRAGSDAUER}}</p>\n" +
    "      <p ng-if=\"!job.UNBEFRISTET_B && !job.VERTRAGSDAUER\" translate=\"aux.Anstellungsdauer.0\"></p>\n" +
    "      <p ng-if=\"job.UNBEFRISTET_B\" translate=\"aux.Anstellungsdauer.1\"></p>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Sprachen -->\n" +
    "    <div class=\"col-md-3\">\n" +
    "      <h4 translate=\"jobs.detail.titlelanguages\"></h4>\n" +
    "      <div ng-if=\"job.SK1_SPRACHE_CODE\">\n" +
    "        <strong class=\"fake-label\" translate=\"aux.STESSPRACHE.{{job.SK1_SPRACHE_CODE}}\"></strong><br />\n" +
    "        (<span translate=\"jobs.detail.spoken\"></span>: <span translate=\"aux.SPRACHKENNTNISSE.{{job.SK1_MUENDLICH_CODE}}\"></span> / <span translate=\"jobs.detail.written\"></span>: <span translate=\"aux.SPRACHKENNTNISSE.{{job.SK1_SCHRIFTLICH_CODE}}\"></span>)\n" +
    "      </div>\n" +
    "      <div ng-if=\"job.SK2_SPRACHE_CODE\">\n" +
    "        <strong class=\"fake-label\" translate=\"aux.STESSPRACHE.{{job.SK2_SPRACHE_CODE}}\"></strong><br />\n" +
    "        (<span translate=\"jobs.detail.spoken\"></span>: <span translate=\"aux.SPRACHKENNTNISSE.{{job.SK2_MUENDLICH_CODE}}\"></span> / <span translate=\"jobs.detail.written\"></span>: <span translate=\"aux.SPRACHKENNTNISSE.{{job.SK2_SCHRIFTLICH_CODE}}\"></span>)\n" +
    "      </div>\n" +
    "      <div ng-if=\"job.SK3_SPRACHE_CODE\">\n" +
    "        <strong class=\"fake-label\" translate=\"aux.STESSPRACHE.{{job.SK3_SPRACHE_CODE}}\"></strong><br />\n" +
    "        (<span translate=\"jobs.detail.spoken\"></span>: <span translate=\"aux.SPRACHKENNTNISSE.{{job.SK3_MUENDLICH_CODE}}\"></span> / <span translate=\"jobs.detail.written\"></span>: <span translate=\"aux.SPRACHKENNTNISSE.{{job.SK3_SCHRIFTLICH_CODE}}\"></span>)\n" +
    "      </div>\n" +
    "      <div ng-if=\"job.SK4_SPRACHE_CODE\">\n" +
    "        <strong class=\"fake-label\" translate=\"aux.STESSPRACHE.{{job.SK4_SPRACHE_CODE}}\"></strong><br />\n" +
    "        (<span translate=\"jobs.detail.spoken\"></span>: <span translate=\"aux.SPRACHKENNTNISSE.{{job.SK4_MUENDLICH_CODE}}\"></span> / <span translate=\"jobs.detail.written\"></span>: <span translate=\"aux.SPRACHKENNTNISSE.{{job.SK4_SCHRIFTLICH_CODE}}\"></span>)\n" +
    "      </div>\n" +
    "      <div ng-if=\"job.SK5_SPRACHE_CODE\">\n" +
    "        <strong class=\"fake-label\" translate=\"aux.STESSPRACHE.{{job.SK5_SPRACHE_CODE}}\"></strong><br />\n" +
    "        (<span translate=\"jobs.detail.spoken\"></span>: <span translate=\"aux.SPRACHKENNTNISSE.{{job.SK5_MUENDLICH_CODE}}\"></span> / <span translate=\"jobs.detail.written\"></span>: <span translate=\"aux.SPRACHKENNTNISSE.{{job.SK5_SCHRIFTLICH_CODE}}\"></span>)\n" +
    "      </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Bewerbung -->\n" +
    "    <div class=\"col-md-3\">\n" +
    "      <h4 translate=\"jobs.detail.titlespecification\"></h4>\n" +
    "      <div ng-if=\"job.BEWER_SCHRIFTLICH_B\">\n" +
    "        <strong class=\"fake-label\" translate=\"jobs.detail.titleletter\"></strong>\n" +
    "        <p translate=\"jobs.detail.letterApplication\"></p>\n" +
    "      </div>\n" +
    "      <div ng-if=\"job.BEWER_ELEKTRONISCH_B\">\n" +
    "        <strong class=\"fake-label\" translate=\"jobs.detail.titleelectronic\"></strong>\n" +
    "        <p>{{job.KP_EMAIL}} <span ng-if=\"job.UNT_URL\">/ {{job.UNT_URL}}</span></p>\n" +
    "      </div>\n" +
    "      <div ng-if=\"job.BEWER_TELEFONISCH_B\">\n" +
    "        <strong class=\"fake-label\" translate=\"jobs.detail.phonebe\"></strong>\n" +
    "        <p>{{job.KP_TELEFON_NR}}</p>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-3\" ng-if=\"!job.WWW_ANONYM_B\">\n" +
    "      <h4 translate=\"jobs.detail.titlecompany\"></h4>\n" +
    "      <span>{{job.UNT_NAME}}<br /></span>\n" +
    "      <span>{{job.UNT_STRASSE}} {{job.UNT_HAUS_NR}}<br /></span>\n" +
    "      <span>{{job.UNT_PLZ}} {{job.UNT_ORT}}</span>\n" +
    "      <span ng-if=\"job.UNT_POSTFACH\"><br />Postfach {{job.UNT_POSTFACH}}<br /></span>\n" +
    "      <span ng-if=\"job.UNT_POSTFACH\">{{job.UNT_POSTFACH_PLZ}} {{job.UNT_POSTFACH_ORT}}</span>\n" +
    "\n" +
    "      <h4 translate=\"jobs.detail.titlecontact\"></h4>\n" +
    "      <span translate=\"aux.ANREDE.{{job.KP_ANREDE_CODE}}\"><br /></span>\n" +
    "      <span>{{job.KP_VORNAME}} {{job.KP_NAME}}<br /></span>\n" +
    "      <span>{{job.KP_TELEFON_NR}}<br /></span>\n" +
    "      <span>{{job.KP_EMAIL}}</span>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"row navigation bottom\" id=\"navbottom\" hotkey=\"{b: ssiKeyResults, d: ssiKeyNext, e: ssiKeyBack, f: ssiKeyPrint}\">\n" +
    "  <div class=\"col-md-offset-1 col-md-2\" align=\"center\">\n" +
    "    <a class=\"btn btn-default btn-plain btn-block\" href=\"{{jobs.length>0 ? '#/job-result' : '#/job-search'}}\" glyph-icon=\"arrow-left\" admin-symbol> <span ng-show=\"jobs.length>0\" translate=\"global.navigation.results\"></span><span ng-hide=\"jobs.length>0\" translate=\"global.navigation.search\"></span></a>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-offset-8 col-md-1\" align=\"right\">\n" +
    "    <help></help>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('views/content/jobs/jobs.html',
    "<div class=\"navigation filter row\" id=\"filter\">\n" +
    "  <div class=\"col-md-3\">\n" +
    "    <br />\n" +
    "    <a href=\"#/educations\" class=\"btn btn-default btn-block btn-plain wab\" glyph-icon=\"arrow-top\" admin-symbol> <strong translate=\"global.educations\"></strong></a>\n" +
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
    "<div class=\"job-results category\">\n" +
    "  <div class=\"row category-groups no-filter\">\n" +
    "    <div class=\"col-md-4\">\n" +
    "      <a class=\"category-group\" ng-click=\"setIscoGroup('1')\"><img src=\"assets/images/512/family3.png\" alt=\"toggeli 1\" /></a><br />\n" +
    "      <strong translate=\"isco.category1\"></strong>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-4\">\n" +
    "      <a class=\"category-group\" ng-click=\"setIscoGroup('2')\"><img src=\"assets/images/512/graduated.png\" alt=\"toggeli 2\" /></a><br />\n" +
    "      <strong translate=\"isco.category2\"></strong>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-4\">\n" +
    "      <a class=\"category-group\" ng-click=\"setIscoGroup('3')\"><img src=\"assets/images/512/tool36.png\" alt=\"toggeli 3\" /></a><br />\n" +
    "      <strong translate=\"isco.category3\"></strong>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"row category-groups\">\n" +
    "    <div class=\"col-md-4\">\n" +
    "      <a class=\"category-group\" ng-click=\"setIscoGroup('4')\"><img src=\"assets/images/512/paperclip.png\" alt=\"toggeli 4\" /></a><br />\n" +
    "      <strong translate=\"isco.category4\"></strong>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-4 \">\n" +
    "      <a class=\"category-group\" ng-click=\"setIscoGroup('5')\"><img src=\"assets/images/512/shop31.png\" alt=\"toggeli 5\" /></a><br />\n" +
    "      <strong translate=\"isco.category5\"></strong>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-4 \">\n" +
    "      <a class=\"category-group\" ng-click=\"setIscoGroup('6')\"><img src=\"assets/images/512/tractor6.png\" alt=\"toggeli 6\" /></a><br />\n" +
    "      <strong translate=\"isco.category6\"></strong>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"row category-groups\">\n" +
    "    <div class=\"col-md-4 \">\n" +
    "      <a class=\"category-group\" ng-click=\"setIscoGroup('7')\"><img src=\"assets/images/512/work26.png\" alt=\"toggeli 7\" /></a><br />\n" +
    "      <strong translate=\"isco.category7\"></strong>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-4 \">\n" +
    "      <a class=\"category-group\" ng-click=\"setIscoGroup('8')\"><img src=\"assets/images/512/construction16.png\" alt=\"toggeli 8\" /></a><br />\n" +
    "      <strong translate=\"isco.category8\"></strong>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-4 \">\n" +
    "      <a class=\"category-group\" ng-click=\"setIscoGroup('9')\"><img src=\"assets/images/512/clean9.png\" alt=\"toggeli 9\" /></a><br />\n" +
    "      <strong translate=\"isco.category9\"></strong>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"row navigation bottom\" id=\"navbottom\">\n" +
    "  <div class=\"col-md-offset-1 col-md-2\" align=\"center\">\n" +
    "    <a class=\"btn btn-default btn-plain btn-block\" href=\"#/frontpage\" glyph-icon=\"info-sign\"> <span translate=\"global.navigation.localInfo\"></span></a>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-offset-6 col-md-2\" align=\"center\">\n" +
    "    <a class=\"btn btn-default btn-primary btn-plain btn-block\" href=\"#/job-search\" translate=\"global.navigation.search\"></a>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-1\" align=\"right\">\n" +
    "    <help></help>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('views/content/jobs/result.html',
    "<div class=\"navigation filter row\" id=\"filter\" flowtype min-font=\"1\" max-font=\"9999\" font-ratio=\"100\" line-ratio=\"1.45\"\n" +
    "     minimum=\"1\" maximum=\"9999\">\n" +
    "  <div class=\"col-md-4\">\n" +
    "    <selectpicker form-label=\"jobs.result.sorting\" id=\"sorting\" options=\"sortList\" label-attribute=\"'text'\" i18n-label=\"true\" ng-model=\"sort\" ng-change=\"sortResultList()\"></selectpicker>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"job-results list-group\">\n" +
    "  <div job-detail=\"jobDetail\" class=\"list-group-item\" ng-repeat=\"jobDetail in jobs\"></div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"row navigation bottom\" id=\"navbottom\" hotkey=\"{b: ssiKeySearch}\">\n" +
    "  <div class=\"col-md-offset-1 col-md-2\">\n" +
    "    <a class=\"btn btn-default btn-plain btn-block\" href=\"#/job-search\" glyph-icon=\"arrow-left\" admin-symbol>&nbsp;<span translate=\"global.navigation.search\"></span></a>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-offset-8 col-md-1\" align=\"right\">\n" +
    "    <help></help>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('views/content/jobs/search.html',
    "<alert ng-show=\"coordsError\" alert-severity=\"danger\" alert-overlay=\"true\" alert-dismissable=\"coordsError=false\" alert-dismissable-on-timeout=\"5000\" alert-dismissable-trigger=\"coordsError\"><strong translate=\"jobs.search.error.noValidCoords\"></strong></alert>\n" +
    "<div class=\"navigation filter row\" id=\"filter\" flowtype min-font=\"1\" max-font=\"9999\" font-ratio=\"100\" line-ratio=\"1.45\" minimum=\"1\" maximum=\"9999\">\n" +
    "  <div class=\"col-md-4\">\n" +
    "    <div ng-if=\"!searchParams.iscoMajorGroup\">\n" +
    "      <selectpicker form-label=\"jobs.search.jobgroup\" id=\"iscoMajorGroup\" options=\"iscoMajorGroup\" label-attribute=\"'text'\" value-attribute=\"'code'\" i18n-label=\"true\" ng-model=\"searchParams.iscoMajorGroup\" ng-change=\"countStellen()\"></selectpicker>\n" +
    "    </div>\n" +
    "    <div ng-if=\"searchParams.iscoMajorGroup\">\n" +
    "      <selectpicker form-label=\"isco.category{{searchParams.iscoMajorGroup}}\" id=\"iscoGroupLevel2\" options=\"iscoGroupLevel2[searchParams.iscoMajorGroup]\" label-attribute=\"'text'\" value-attribute=\"'code'\" i18n-label=\"true\" ng-model=\"searchParams.iscoGroupLevel2\" ng-change=\"countStellen()\"></selectpicker>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-2 location-plz\">\n" +
    "    <input class=\"keyboard\" type=\"text\" name=\"location\" id=\"location\" form-input form-label=\"jobs.search.location\" ng-model=\"nearestZip\" form-inset=\"search\" form-inset-btn form-alert=\"jobs.search.error.noValidZip\" form-alert-trigger=\"locationError\" alert-severity=\"danger\" alert-dismissable=\"true\" />\n" +
    "  </div>\n" +
    "  <div class=\"col-md-2\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"distance\" translate=\"jobs.search.distance\" translate-values=\"{value:searchParams.distance}\"></label>\n" +
    "      <slider id=\"distance\" ng-model=\"searchParams.distance\" ng-mouseup=\"countStellen()\" min=\"distanceOptions.min\" step=\"distanceOptions.step\" max=\"distanceOptions.max\" value=\"distanceOptions.value\"></slider>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-2\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"onlineSince\">\n" +
    "        <span ng-show=\"searchParams.distance>1\" translate=\"jobs.search.onlineSince\" translate-values=\"{value:searchParams.onlineSince}\"></span>\n" +
    "        <span ng-show=\"searchParams.distance<2\" translate=\"jobs.search.onlineSinceOneDay\"></span>\n" +
    "      </label>\n" +
    "      <slider id=\"onlineSince\" ng-model=\"searchParams.onlineSince\" ng-mouseup=\"countStellen()\" min=\"onlineSinceOptions.min\" step=\"onlineSinceOptions.step\" max=\"onlineSinceOptions.max\" value=\"onlineSinceOptions.value\"></slider>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-2\">\n" +
    "    <input type=\"radio\" ng-model=\"searchParams.fulltime\" name=\"fulltime\" value=\"1\" id=\"fulltime\" form-label=\"jobs.search.allJobs\" ng-change=\"countStellen()\" />\n" +
    "    <input type=\"radio\" ng-model=\"searchParams.fulltime\" name=\"fulltime\" value=\"2\" id=\"parttime\" form-label=\"jobs.search.parttimeJobs\" ng-change=\"countStellen()\" />\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "  <div class=\"col-md-2\">\n" +
    "    <strong>\n" +
    "      <span translate=\"jobs.search.foundJobs\" translate-values=\"{value: count}\"></span><img ng-if=\"idle\" alt=\"idle\" src=\"data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==\" />\n" +
    "    </strong>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-10\">\n" +
    "    <swiss-map id=\"map\"></swiss-map>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"navigation bottom row\" id=\"navbottom\" hotkey=\"{b: ssiKeyStart}\">\n" +
    "  <div class=\"col-md-offset-1 col-md-2\">\n" +
    "    <a class=\"btn btn-default btn-plain btn-block\" href=\"#/{{searchType}}\" glyph-icon=\"arrow-left\" admin-symbol> <span translate=\"global.navigation.startpage\"></span></a>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-offset-6 col-md-2\" align=\"center\">\n" +
    "    <a href=\"#/job-results\" class=\"btn btn-default btn-primary btn-plain btn-block\" ng-disabled=\"count===0 || idle\">\n" +
    "      <span translate=\"global.navigation.showJobs\"></span>\n" +
    "    </a>\n" +
    "  </div>\n" +
    "  <div class=\"col-md-1\" align=\"right\">\n" +
    "    <help></help>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('views/content/localInfo/localInfo.html',
    "<div class=\"col-md-12\">\n" +
    "  <h1 style=\"margin-top: 10px; margin-bottom: 5px;\" translate=\"localInfo.title\"></h1>\n" +
    "  <hr style=\"margin-top: 5px;\" />\n" +
    "</div>\n"
  );


  $templateCache.put('views/navbar/navbar.html',
    "<div class=\"navbar navbar-inverse\" role=\"navigation\">\n" +
    "  <div class=\"container\">\n" +
    "    <div class=\"navbar-header\">\n" +
    "      <div class=\"navbar-brand\">\n" +
    "        <a href=\"#/\" glyph-icon=\"home\">\n" +
    "          <span translate=\"common.page.title\"></span>\n" +
    "        </a>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );

}]);
