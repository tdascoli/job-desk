!function(){"use strict";var a=angular.module("job-desk",["LocalStorageModule","tmh.dynamicLocale","ui.router","ui.bootstrap-slider","ngResource","ngSanitize","ngCookies","ngFlowtype","pascalprecht.translate","ngCacheBuster","geolocation","alv-ch-ng.core","alv-ch-ng.security","alv-ch-ng.scroll","alv-ch-ng.forms","alv-ch-ng.selectpicker","alv-ch-ng.text-truncate","job-desk.i18n","job-desk.directive"]);a.config(["$httpProvider",function(a){a.defaults.headers.useXDomain=!0,a.defaults.withCredentials=!0,a.interceptors.push("authInterceptor"),delete a.defaults.headers.common["X-Requested-With"],a.defaults.headers.common["If-Modified-Since"]="01 Jan 1970 00:00:00 GMT"}]),a.config(["$stateProvider","$urlRouterProvider","httpRequestInterceptorCacheBusterProvider","SecurityConfigProvider",function(a,b,c,d){d.setClientId("job-desk"),d.setClientSecret("job-deskSecret"),c.setMatchlist([/.*rest.*/,/.*protected.*/],!0),b.otherwise("/"),a.state("site",{"abstract":!0,views:{"navbar@":{templateUrl:"views/navbar/navbar.html",controller:"NavbarCtrl"}}})}]),a.config(["$stateProvider",function(a){a.state("error",{parent:"site",url:"/error",data:{roles:[],hidden:!0},views:{"content@":{templateUrl:"views/content/error/error.html"}},resolve:{mainTranslatePartialLoader:["$translate","$translatePartialLoader",function(a,b){return b.addPart("errors"),a.refresh()}]},hidden:!0}).state("frontpage",{parent:"site",url:"/frontpage",views:{"content@":{templateUrl:"views/content/localInfo/localInfo.html"}}})}]),a.run(["$http","geolocation","$rootScope",function(a,b,c){b.getLocation().then(function(a){c.myCoords={lat:a.coords.latitude,lon:a.coords.longitude}})}])}(),angular.module("job-desk").constant("ENV","prod").constant("VERSION","src/main").constant("baseUrl","http://jobdesk-alvchegov.rhcloud.com/jobdesk").constant("supportedLanguages",["de","fr","it","en"]),function(){"use strict";var a=angular.module("job-desk.i18n",["pascalprecht.translate","LocalStorageModule","tmh.dynamicLocale"]);a.config(["$translateProvider","tmhDynamicLocaleProvider",function(a,b){a.useLoader("$translatePartialLoader",{urlTemplate:"i18n/{lang}/{part}.json"}),a.useCookieStorage(),a.preferredLanguage("de"),b.localeLocationPattern("bower_components/angular-i18n/angular-locale_{{locale}}.js"),b.useCookieStorage("NG_TRANSLATE_LANG_KEY")}]),a.run(["$rootScope","$translate","LanguageService","$translatePartialLoader",function(a,b,c,d){a.changeLanguage=function(a){b.use(a)},c.getAll().then(function(b){a.languages=b}),a.$on("$stateChangeStart",function(){c.getCurrent().then(function(a){b.use(a)})}),function(){for(var a=0;a<c.getDefaultParts().length;a++){var e=c.getDefaultParts()[a];d.addPart(e)}b.refresh()}()}]),a.controller("LanguageCtrl",["$scope","LanguageService",function(a,b){a.getCurrent=b.getCurrent,a.getAll=b.getAll}]),a.provider("LanguageService",function(){function a(){var a=d.defer(),b=f.storage().get("NG_TRANSLATE_LANG_KEY");return angular.isUndefined(b)&&(b="en"),a.resolve(b),a.promise}function b(){var a=d.defer();return a.resolve(g),a.promise}function c(){return h}var d,e,f,g=["de","fr","it","en"],h=["global","languages","errors"];this.setLanguages=function(a){g=a},this.setDefaultParts=function(a){h=a},this.$get=["$q","$http","$translate",function(g,h,i){return d=g,e=h,f=i,{getAll:b,getCurrent:a,getDefaultParts:c}}]})}(),function(){"use strict";var a=angular.module("job-desk.directive",[]);a.factory("d3Service",["$document","$q","$rootScope",function(a,b,c){function d(){c.$apply(function(){e.resolve(window.d3)})}var e=b.defer(),f=a[0].createElement("script");f.type="text/javascript",f.async=!0,f.src="http://d3js.org/d3.v3.min.js",f.onreadystatechange=function(){"complete"===this.readyState&&d()},f.onload=d;var g=a[0].getElementsByTagName("body")[0];return g.appendChild(f),{d3:function(){return e.promise}}}]),a.directive("swissMap",["d3Service","$window","$rootScope",function(a,b,c){return{priority:10,restrict:"E",link:function(b){a.d3().then(function(a){function d(){c.$watch("myCoords",function(){if(void 0!==c.myCoords){var a="my-location",b=q([c.myCoords.lon,c.myCoords.lat]);s.append("circle").attr({cx:b[0],cy:b[1],r:3}).attr("class",a).attr("id",a),e(!1)}})}function e(a){if(void 0!==b.currentCoords){$("#current-radius").remove(),$("#current-location").remove(),$("#my-radius").remove();var c="current-location",d="current-radius",e=2;a&&(c="my-location",d="my-radius",e=3);var f=q([b.currentCoords.lon,b.currentCoords.lat]);s.append("circle").attr({cx:f[0],cy:f[1],r:e}).attr("class",c).attr("id",c),s.append("circle").attr({cx:f[0],cy:f[1],r:2*b.searchParams.distance}).attr("class","radius").attr("id",d)}}function f(){$(".city-boundaries").remove(),$(".city-text").remove(),a.json("assets/topojson/cities.json",function(a){for(var b=0;b<a.length;b++){var c=q(a[b].geometry.coordinates);s.append("svg:circle").attr("cx",c[0]).attr("cy",c[1]).attr("r",3).attr("class","city-boundaries").text(a[b].properties.name),s.append("text").attr("transform","translate("+q(a[b].geometry.coordinates)+")").attr("dy","1.25em").attr("class","city-text").text(a[b].properties.name)}})}function g(){i=$("#map").parent().width(),l=i*k,l>m&&(l=m,i=l/k,j=17*i),q.translate([i/2,l/2]).scale(15*i),s.style("width",i+"px").style("height",l+"px"),s.selectAll(".canton-boundaries").attr("d",r),s.selectAll(".contour").attr("d",r),s.selectAll(".lakes").attr("d",r),$(".my-location").remove(),f(),d()}var h,i=$("#map").parent().width(),j=17*i,k=.625,l=i*k,m=$(window).height()-($("#topnav").height()+$("#filter").height()+$("#navbottom").height()),n=[500,1e3,1500,2e3,2500,3e3,3500,4e3];l>m&&(l=m,i=l/k,j=17*i);var o=a.interpolateHcl("#94BF8B","#F5F4F2"),p=a.scale.threshold().domain(n).range(a.range(n.length+1).map(function(a,b){return o(b/n.length)})),q=a.geo.albers().rotate([0,0]).center([8.3,46.8]).scale(j).translate([i/2,l/2]).precision(.1),r=a.geo.path().projection(q),s=a.select("#map").append("svg").attr("width",i).attr("height",l),t=s.append("g");a.json("assets/topojson/ch-contours.json",function(a,b){h=t.append("svg").attr("id","contours").selectAll(".contour").data(topojson.feature(b,b.objects.contours).features).enter().append("path").attr("class","contour").attr("d",r).style("fill",function(a){return p(a.id)})}),a.json("assets/topojson/ch.json",function(a,b){t.append("svg").attr("id","cantons").selectAll("path").data(topojson.feature(b,b.objects.cantons).features).enter().append("path").attr("class","canton-boundaries").attr("id",function(a){return a.properties.abbr}).attr("d",r),t.append("path").attr("id","lakes").datum(topojson.mesh(b,b.objects.lakes)).attr("class","lakes").attr("d",r)}),window.onresize=function(){g()},a.select(window).on("resize",g()),a.select("svg").on("mousedown.log",function(){var c=q.invert(a.mouse(this));b.setCurrentCoords({lon:c[0],lat:c[1]})}),b.$watch("searchParams.distance",function(){$(".radius").attr("r",2*b.searchParams.distance)}),b.$watch("currentCoords",function(){void 0!==b.currentCoords&&e(!1)})})}}}])}(),angular.module("job-desk").config(["$stateProvider",function(a){a.state("localInfo",{parent:"site",url:"/localInfo",sequence:0,label:"global.menu.localInfo",hidden:!0,views:{"content@":{templateUrl:"views/content/localInfo/localInfo.html",controller:"LocalInfoController"}},resolve:{mainTranslatePartialLoader:["$translate","$translatePartialLoader",function(a,b){return b.addPart("localInfo"),a.refresh()}]}})}]),angular.module("job-desk").controller("LocalInfoController",["$scope",function(a){a.test="test"}]),angular.module("job-desk").config(["$stateProvider",function(a){a.state("apprenticeships",{parent:"site",url:"/apprenticeships",label:"global.menu.apprenticeships",views:{"content@":{templateUrl:"views/content/apprenticeships/apprenticeships.html",controller:"ApprenticeshipsCtrl"}},resolve:{mainTranslatePartialLoader:["$translate","$translatePartialLoader",function(a,b){return b.addPart("apprenticeships"),a.refresh()}]}}).state("apprenticeship-search",{parent:"site",url:"/apprenticeship-search",views:{"content@":{templateUrl:"views/content/apprenticeships/search.html",controller:"ApprenticeshipsCtrl"}},resolve:{mainTranslatePartialLoader:["$translate","$translatePartialLoader",function(a,b){return b.addPart("jobs"),a.refresh()}]}})}]),function(){"use strict";angular.module("job-desk").factory("ApprenticeshipsService",["$http","baseUrl",function(a,b){function c(c,e){a.post(b+"/locations/area",{coord:c,radius:d.km}).success(function(c){var f="",g=[],h=0;angular.forEach(c.areas,function(a){0===h&&(f=a.CODE+" ("+a.TEXT+")"),-1===g.indexOf(a.CODE)&&g.push(a.CODE)}),a.post(b+"/lenas/countJobs",{plz:g,swissdoc:d.swissdoc,swissdoc2:d.swissdoc2}).success(function(a){e(a.count,g,f)})})}var d={km:30,swissdoc:"",swissdoc2:"",locations:[]};return{count:c,params:d}}])}(),function(){"use strict";angular.module("job-desk").controller("ApprenticeshipsCtrl",["$scope","$rootScope","$state","ApprenticeshipsService",function(a,b,c,d){b.searchType="apprenticeships",a.searchParams=d.params,a.kmOptions={min:10,max:150,step:10,value:30},a.idle=!1,a.count=0,a.nearestZip="",a.currentCoords=void 0,a.sort=0,a.executeSearch=function(){c.go("apprenticeship-result")},a.executeSearch=function(){d.find(a.searchParams).success(function(b){a.apprenticeships=b})},a.setSwissdocGroup=function(b){a.searchParams.swissdoc=b,a.searchParams.swissdoc2="",c.go("apprenticeship-search")},a.countStellen=function(){a.idle=!0,d.count(a.currentCoords,function(b,c,d){a.count=b,a.nearestZip=d,a.searchParams.locations=c,a.idle=!1})},a.showDistanceInKM=function(){return 1===a.searchParams.areaType?a.searchParams.km+" km":""},a.setCurrentCoords=function(b){a.currentCoords=b,a.$digest()},a.$watch("currentCoords",function(){void 0!==a.currentCoords&&a.countStellen()}),a.$watch("myCoords",function(){void 0!==b.myCoords&&(a.currentCoords=b.myCoords)})}])}(),angular.module("job-desk").config(["$stateProvider",function(a){a.state("educations",{parent:"site",url:"/educations",label:"global.menu.educations",views:{"content@":{templateUrl:"views/content/educations/educations.html",controller:"EducationsCtrl"}},resolve:{mainTranslatePartialLoader:["$translate","$translatePartialLoader",function(a,b){return b.addPart("educations"),a.refresh()}]}})}]),function(){"use strict";angular.module("job-desk").factory("EducationsService",["$http",function(a){function b(){return a.get(e)}function c(b){var c=c,d=0;for(var e in b)(b[e]||b[e]===!1)&&(c+=d>0?"&":"?",c=c+e+"="+b[e],d++);return a.get(c)}var d={search:"educations"},e="resource/educations";return{all:b,find:c,params:d}}])}(),function(){"use strict";angular.module("job-desk").controller("EducationsCtrl",["$scope","$rootScope","EducationsService",function(a,b,c){b.searchType="educations",a.searchParams=c.params,a.educations=b.educations,a.executeSearch=function(){c.find(a.searchParams).success(function(b){a.educations=b})}}])}(),angular.module("job-desk").config(["$stateProvider",function(a){a.state("jobs",{parent:"site",url:"/",label:"global.menu.jobs",views:{"content@":{templateUrl:"views/content/jobs/jobs.html",controller:"JobsCtrl"}},resolve:{mainTranslatePartialLoader:["$translate","$translatePartialLoader",function(a,b){return b.addPart("jobs"),a.refresh()}]}}).state("job-search",{parent:"site",url:"/job-search",views:{"content@":{templateUrl:"views/content/jobs/search.html",controller:"JobsCtrl"}},resolve:{mainTranslatePartialLoader:["$translate","$translatePartialLoader",function(a,b){return b.addPart("jobs"),a.refresh()}]}}).state("job-results",{parent:"site",url:"/job-results",views:{"content@":{templateUrl:"views/content/jobs/result.html",controller:"JobsCtrl"}},resolve:{mainTranslatePartialLoader:["$translate","$translatePartialLoader",function(a,b){return b.addPart("jobs"),a.refresh()}]}}).state("job-detail",{parent:"site",url:"/job-detail/:jobId",views:{"content@":{templateUrl:"views/content/jobs/detail.html",controller:"JobsCtrl"}},resolve:{mainTranslatePartialLoader:["$translate","$translatePartialLoader",function(a,b){return b.addPart("jobs"),a.refresh()}],jobDetailLoader:["$stateParams","JobsService",function(a,b){b.getJob(a.jobId)}]}})}]),function(){"use strict";angular.module("job-desk").factory("JobsService",["$http","baseUrl",function(a,b){function c(c){var e={query:{filtered:{query:{match_all:{}},filter:{and:[{range:{onlineSince:{lte:d.onlineSince}}},{nested:{path:"locations.location",filter:{geo_distance:{distance:d.distance+"km","locations.location.coords":c}}}}]}}}};return"2"===d.fulltime&&e.query.filtered.filter.and.push({term:{fulltime:"false"}}),""!==d.iscoMajorGroup&&e.query.filtered.filter.and.push({term:{"isco.majorGroup":d.iscoMajorGroup}}),""!==d.iscoGroupLevel2&&e.query.filtered.filter.and.push({term:{"isco.groupLevel2":d.iscoGroupLevel2}}),a.post(b+"/jobs/_search",e)}var d={distance:30,onlineSince:5,fulltime:1,iscoMajorGroup:"",iscoGroupLevel2:""};return{find:c,params:d}}])}(),function(){"use strict";angular.module("job-desk").controller("JobsCtrl",["$scope","$rootScope","$state","$filter","$translate","JobsService","LocationsService","lodash",function(a,b,c,d,e,f,g,h){function i(b){g.getLocation(b).success(function(c){c.hits.total>0?(a.currentCoords=b,a.nearestZip=c.hits.hits[0]._source.zip+" ("+c.hits.hits[0]._source.name+")",a.currentZip=c.hits.hits[0]._source.zip,a.locationError=!1,a.coordsError=!1,a.countStellen()):a.coordsError=!0}).error(function(a){console.log(a)})}function j(a){c.go(a)}b.searchType="jobs",a.searchParams=f.params,a.distanceOptions={min:10,max:150,step:10,value:30},a.onlineSinceOptions={min:1,max:60,step:1,value:5},a.iscoMajorGroup=[{text:"isco.category1",code:"1"},{text:"isco.category2",code:"2"},{text:"isco.category3",code:"3"},{text:"isco.category4",code:"4"},{text:"isco.category5",code:"5"},{text:"isco.category6",code:"6"},{text:"isco.category7",code:"7"},{text:"isco.category8",code:"8"},{text:"isco.category9",code:"9"}],a.iscoGroupLevel2=[],a.iscoGroupLevel2[1]=[{code:"11",text:"isco.1.11"},{code:"12",text:"isco.1.12"},{code:"13",text:"isco.1.13"},{code:"14",text:"isco.1.14"}],a.iscoGroupLevel2[2]=[{code:"21",text:"isco.2.21"},{code:"22",text:"isco.2.22"},{code:"23",text:"isco.2.23"},{code:"24",text:"isco.2.24"},{code:"25",text:"isco.2.25"},{code:"26",text:"isco.2.26"}],a.iscoGroupLevel2[3]=[{code:"31",text:"isco.3.31"},{code:"32",text:"isco.3.32"},{code:"33",text:"isco.3.33"},{code:"34",text:"isco.3.34"},{code:"35",text:"isco.3.35"}],a.iscoGroupLevel2[4]=[{code:"41",text:"isco.4.41"},{code:"42",text:"isco.4.42"},{code:"43",text:"isco.4.43"},{code:"44",text:"isco.4.44"}],a.iscoGroupLevel2[5]=[{code:"51",text:"isco.5.51"},{code:"52",text:"isco.5.52"},{code:"53",text:"isco.5.53"},{code:"54",text:"isco.5.54"}],a.iscoGroupLevel2[6]=[{code:"61",text:"isco.6.61"},{code:"62",text:"isco.6.62"},{code:"63",text:"isco.6.63"}],a.iscoGroupLevel2[7]=[{code:"71",text:"isco.7.71"},{code:"72",text:"isco.7.72"},{code:"73",text:"isco.7.73"},{code:"74",text:"isco.7.74"},{code:"75",text:"isco.7.75"}],a.iscoGroupLevel2[8]=[{code:"81",text:"isco.8.81"},{code:"82",text:"isco.8.82"},{code:"83",text:"isco.8.83"}],a.iscoGroupLevel2[9]=[{code:"91",text:"isco.9.91"},{code:"92",text:"isco.9.92"},{code:"93",text:"isco.9.93"},{code:"94",text:"isco.9.94"},{code:"95",text:"isco.9.95"},{code:"96",text:"isco.9.96"}],a.idle=!1,a.count=0,a.nearestZip="",a.currentZip="",a.currentCoords=void 0,a.locationError=!1,a.coordsError=!1,a.showResults=function(){c.go("job-result")},a.setIscoGroup=function(b){a.searchParams.iscoMajorGroup=b,a.searchParams.iscoGroupLevel2="",c.go("job-search")},a.countStellen=function(){f.find(a.currentCoords).success(function(c){b.jobs=c.hits.hits,a.count=c.hits.total}).error(function(a){console.log(a)})},a.setCurrentCoords=function(a){i(a)},a.$watch("currentCoords",function(){void 0!==a.currentCoords&&i(a.currentCoords)}),a.$watch("myCoords",function(){void 0!==b.myCoords&&(a.currentCoords=b.myCoords)}),a.setCurrentZip=function(b){g.getLocationFromZip(b).success(function(b){b.hits.total>0?i(b.hits.hits[0]._source.geoLocation):a.locationError=!0}).error(function(a){console.log(a)})};var k=d("orderBy");a.sortList=[{code:{field:"_source.onlineSince",order:!1},text:"global.sort.neuste"},{code:{field:"_source.quotaTo",order:!0},text:"global.sort.pensum_0"},{code:{field:"_source.quotaTo",order:!1},text:"global.sort.pensum_100"},{code:{field:"_source.title.de",order:!1},text:"global.sort.jobtitel_az"},{code:{field:"_source.title.de",order:!0},text:"global.sort.jobtitel_za"}],a.sortResultList=function(){var c=h.findIndex(a.sortList,a.sort);b.jobs=k(b.jobs,a.sortList[c].code.field,a.sortList[c].code.order)},a.ssiKeyStart=function(){c.go("startpage")},a.ssiKeyInfo=function(){c.go("frontpage")},a.ssiKeySearch=function(){j("job-search")},a.ssiKeyResults=function(){j("job-result")},a.ssiKeyNext=function(){a.navigateToJob(!0)},a.ssiKeyBack=function(){a.navigateToJob(!1)}}])}(),function(){"use strict";var a=angular.module("job-desk");a.directive("help",function(){return{priority:10,restrict:"E",replace:!0,templateUrl:"assets/templates/help.html",link:function(a,b){b.addClass("example")}}}),a.directive("categoryGroup",["$window",function(a){return{priority:10,restrict:"C",link:function(b,c){var d=a.innerHeight/5-20;c.css("height",d),b.$on("$viewContentLoaded",function(){d=a.innerHeight/5-20,c.css("height",d)}),$(a).resize(function(){d=a.innerHeight/5-20,c.css("height",d)})}}}]),a.directive("jobResults",["$window",function(a){return{priority:10,restrict:"C",link:function(b,c){var d=$("#filter").outerHeight(!0)||0,e=$("#navbottom").outerHeight(!0)||0,f=$("#topnav").outerHeight(!0)||0,g=a.innerHeight-(d+e+f);c.css("height",g),b.$on("$viewContentLoaded",function(){d=$("#filter").outerHeight(!0)||0,e=$("#navbottom").outerHeight(!0)||0,f=$("#topnav").outerHeight(!0)||0,g=a.innerHeight-(d+e+f),c.css("height",g)}),$(a).resize(function(){d=$("#filter").outerHeight(!0)||0,e=$("#navbottom").outerHeight(!0)||0,f=$("#topnav").outerHeight(!0)||0,g=a.innerHeight-(d+e+f),c.css("height",g)})}}}]),a.directive("jobDetail",["$translate",function(a){return{priority:10,restrict:"A",scope:{jobDetail:"="},templateUrl:"assets/templates/job-detail.html",link:function(b,c){b.showDetailContent=!1,b.getMultiLanguageText=function(b){return b[a.use()]},b.showDetail=function(){c.addClass("visited"),b.showDetailContent=!b.showDetailContent}}}}]),a.directive("navigation",["$window",function(a){return{priority:10,restrict:"C",link:function(b,c){var d=a.innerHeight/5/2;c.css("height",d),b.$on("$viewContentLoaded",function(){d=a.innerHeight/5/2,c.css("height",d)}),$(a).resize(function(){d=a.innerHeight/5/2,c.css("height",d)})}}}]),a.directive("keyboard",function(){return{priority:100,require:"?ngModel",restrict:"C",link:function(a,b,c,d){var e=b.offset();d&&(b.click(function(){b.getkeyboard().reveal()}),$(b).keyboard({layout:"custom",customLayout:{"default":["{clear} {b}","7 8 9","4 5 6","1 2 3","0 {a} {c}"]},accepted:function(b,c,d){var e=d.value;e.length<4&&(e=a.currentZip),a.setCurrentZip(e)},canceled:function(){a.setCurrentZip(a.currentZip)},beforeVisible:function(){a.locationError=!1,$("#location_keyboard").css("top",e.top+b.outerHeight(!0)),$("#location_keyboard").css("left",e.left+4),$("#location_keyboard").css("width",b.outerWidth(!0)),d.$setViewValue(null),d.$render()},maxLength:4,restrictInput:!0,preventPaste:!0,autoAccept:!1,usePreview:!1,stayOpen:!0}))}}}),a.directive("formAlert",["$compile",function(a){return{priority:5,restrict:"A",link:function(b,c,d){var e=d.formAlertTrigger||!0,f=d.alertSeverity||"info",g=d.alertDismissable||!1,h=d.alertDismissableText||!1,i=angular.element('<alert ng-show="'+e+'" alert-severity="'+f+'" alert-dismissable="'+g+'"><strong translate="'+d.formAlert+'"></strong></alert>');h&&i.attr("alert-dismissable-text",h),i.addClass("form-alert"),a(i)(b),c.after(i)}}}])}(),function(){"use strict";angular.module("job-desk").factory("LocationsService",["$http","baseUrl",function(a,b){function c(c){var d={query:{filtered:{query:{match_all:{}},filter:{geo_distance:{distance:"10km",geoLocation:c}}}},sort:[{_geo_distance:{geoLocation:c,order:"asc",unit:"km",distance_type:"plane"}}]};return a.post(b+"/locations/_search",d)}function d(c){var d={query:{filtered:{query:{term:{zip:c}},filter:{term:{additionalNumber:0}}}}};return a.post(b+"/locations/_search",d)}return{getLocation:c,getLocationFromZip:d}}])}(),angular.module("job-desk").run(["$templateCache",function(a){"use strict";a.put("assets/templates/help.html",'<div id=help> <svg version=1.1 id=Layer_1 xmlns=http://www.w3.org/2000/svg xmlns:xlink=http://www.w3.org/1999/xlink x=0px y=0px width=39px height=39px viewbox="0 0 39 39" enable-background="new 0 0 39 39" xml:space=preserve> <g> <path style="fill: rgb(68, 141, 214)" class=uv-bubble-background fill="rgba(46, 49, 51, 0.6)" d="M31.425,34.514c-0.432-0.944-0.579-2.007-0.591-2.999c4.264-3.133,7.008-7.969,7.008-13.409\n                C37.842,8.658,29.594,1,19.421,1S1,8.658,1,18.105c0,9.446,7.932,16.79,18.105,16.79c1.845,0,3.94,0.057,5.62-0.412\n                c0.979,1.023,2.243,2.3,2.915,2.791c3.785,2.759,7.571,0,7.571,0S32.687,37.274,31.425,34.514z"></path> <g> <g> <path style="fill: white" class=uv-bubble-foreground fill=#FFFFFF d="M16.943,19.467c0-3.557,4.432-3.978,4.432-6.058c0-0.935-0.723-1.721-2.383-1.721\n                        c-1.508,0-2.773,0.725-3.709,1.87l-2.441-2.743c1.598-1.9,4.01-2.924,6.602-2.924c3.891,0,6.271,1.959,6.271,4.765\n                        c0,4.4-5.037,4.732-5.037,7.265c0,0.481,0.243,0.994,0.574,1.266l-3.316,0.965C17.303,21.459,16.943,20.522,16.943,19.467z\n                         M16.943,26.19c0-1.326,1.114-2.441,2.44-2.441c1.327,0,2.442,1.115,2.442,2.441c0,1.327-1.115,2.441-2.442,2.441\n                        C18.058,28.632,16.943,27.518,16.943,26.19z"></path> </g> </g> </g> </svg> </div>'),a.put("assets/templates/job-detail.html",'<div class=row> <span class="job-result col-md-10" ng-click=showDetail()> <h4 class=strong>{{getMultiLanguageText(jobDetail._source.title)}}</h4> <strong ng-show="jobDetail._source.onlineSince>1" translate=jobs.result.onlineSince translate-values="{value: jobDetail._source.onlineSince}"></strong> <strong ng-show="jobDetail._source.onlineSince===1" translate=jobs.result.onlineSinceOneDay></strong> / <strong translate=jobs.result.workload></strong> <strong ng-if="jobDetail._source.quotaFrom!==jobDetail._source.quotaTo">{{jobDetail._source.quotaFrom}} - {{jobDetail._source.quotaTo}}%</strong> <strong ng-if="jobDetail._source.quotaFrom===jobDetail._source.quotaTo">{{jobDetail._source.quotaTo}}%</strong> <span ng-hide="jobDetail._source.externalSource===true"> <p ng-show=!showDetailContent ng-text-truncate=getMultiLanguageText(jobDetail._source.description) ng-tt-words-threshold=20 ng-tt-no-toggling></p> <div ng-show=showDetailContent> <p ng-bind-html=getMultiLanguageText(jobDetail._source.description)></p> <div class=row> <div class=col-md-3> <strong class=fake-label translate=jobs.result.jobLocation></strong> <p>{{getMultiLanguageText(jobDetail._source.locations.remarks)}}</p> <strong class=fake-label translate=jobs.result.entryDate></strong> <p ng-if=jobDetail._source.availableNow translate=jobs.result.availableNow></p> <p ng-if="!jobDetail._source.availableNow && jobDetail._source.startDate" translate=jobs.result.availableFromDate translate-values="{value: jobDetail._source.startDate}"></p> <p ng-if="!jobDetail._source.availableNow && !jobDetail._source.startDate" translate=jobs.result.availableByAppointment></p> <strong class=fake-label translate=jobs.result.contractDuration></strong> <p ng-if="!jobDetail._source.permanentJob && jobDetail._source.endDate" translate=untilDate translate-values="{value: jobDetail._source.endDate}"></p> <p ng-if="!jobDetail._source.permanentJob && !jobDetail._source.endDate" translate=jobs.result.nonPermanent></p> <p ng-if=jobDetail._source.permanentJob translate=jobs.result.permanent></p> </div> <!-- Sprachen --> <div class=col-md-3> <div ng-repeat="language in jobDetail._source.languages" ng-show=language.languageCode> <strong class=fake-label translate=language.jobs.{{language.languageCode}}></strong><br> (<span translate=jobs.result.spoken></span>: <span translate=global.codes.languages.skills.{{language.spokenCode}}></span> / <span translate=jobs.result.written></span>: <span translate=global.codes.languages.skills.{{language.writtenCode}}></span>) </div> </div> <!-- Bewerbung --> <div class=col-md-3> <div ng-if=jobDetail._source.application.written> <strong class=fake-label translate=jobs.result.titleWrittenApplication></strong> <p translate=jobs.result.letterApplication></p> </div> <div ng-if=jobDetail._source.application.electronical> <strong class=fake-label translate=jobs.result.titleElectronicApplication></strong> <p>{{jobDetail._source.contact.eMail}} <span ng-if=jobDetail._source.company.url>/ {{jobDetail._source.company.url}}</span></p> </div> <div ng-if=jobDetail._source.application.phone> <strong class=fake-label translate=jobs.result.titlePhoneApplication></strong> <p>{{jobDetail._source.contact.phone}}</p> </div> </div> <div class=col-md-3> <strong>{{jobDetail._source.company.name}}<br></strong> <span>{{jobDetail._source.company.address.street}}<br></span> <span>{{jobDetail._source.company.address.zip}} {{jobDetail._source.company.address.location}}<br></span> <span ng-if=jobDetail._source.company.poAddress.poBox><br><span translate=jobs.result.poBox translate-values="{value: jobDetail._source.company.poAddress.poBox}"></span><br></span> <span ng-if=jobDetail._source.company.poAddress.poBox>{{jobDetail._source.company.poAddress.zip}} {{jobDetail._source.company.poAddress.location}}</span> <br> <strong><span translate=global.codes.salutations.{{jobDetail._source.contact.gender}}></span> {{jobDetail._source.contact.firstName}} {{jobDetail._source.contact.lastName}}<br></strong> <span ng-if=jobDetail._source.contact.phone>{{jobDetail._source.contact.phone}}<br></span> <span ng-if=jobDetail._source.contact.eMail>{{jobDetail._source.contact.eMail}}</span> </div> </div> </div> </span> <p ng-show="jobDetail._source.externalSource===true">QUELLE EXTERN</p> </span> <div class=col-md-2 align=center> <button glyph-icon=search admin-symbol class="btn-plain btn-block" ng-click=showDetail() ng-show=!showDetailContent>&nbsp;<span translate=jobs.result.showMore></span></button> <button glyph-icon=close admin-symbol class="btn-plain btn-block" ng-click=showDetail() ng-show=showDetailContent>&nbsp;<span translate=jobs.result.showLess></span></button> <p></p> <button glyph-icon=print admin-symbol class="btn-plain btn-block">&nbsp;<span translate=jobs.result.print></span></button> </div> </div>'),a.put("assets/templates/numeric.html",'<div> <div class=button-wrapper> <button ng-key=1>1</button> <button ng-key=2>2</button> <button data-ng-key=3>3</button> <button data-ng-key=4>4</button> <button data-ng-key=5>5</button> <button data-ng-key=6>6</button> <button data-ng-key=7>7</button> <button data-ng-key=8>8</button> <button data-ng-key=9>9</button> <button data-ng-key=0 class=button-wide>0</button> <button ng-click=setCoords() class="smaller primary">Ok</button> <button ng-click=closeNumpad() class=smaller>Close</button> <button ng-click=clearNumpad() class=smaller>Clear</button> </div> </div>'),a.put("assets/templates/results.html",'<div class=row> <a href=#/detail/{{job.id}} class="job-result col-md-10"> <strong class=fake-label>{{job.BEZEICHNUNG}} / #{{job.id}} / Online seit {{job.ONLINE_SEIT}} Tag(en) / {{job.PENSUM_BIS}}%</strong> <p ng-text-truncate=job.BESCHREIBUNG ng-tt-chars-threshold=200 ng-tt-no-toggling></p> </a> <div class=cold-md-2 align=center> <button glyph-icon=print admin-symbol class="result-button btn-plain"></button> <button ng-click=star(job.id) glyph-icon=star admin-symbol class="result-button btn-plain" ng-class="{favorite: isStarred(job.id)}"></button> </div> </div>')}]);