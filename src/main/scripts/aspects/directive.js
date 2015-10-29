;(function () {
  'use strict';

  var module = angular.module('job-desk.directive', []);

  module.factory('d3Service', ['$document', '$q', '$rootScope',
    function ($document, $q, $rootScope) {
      var d = $q.defer();

      function onScriptLoad() {
        // Load client in the browser
        $rootScope.$apply(function () {
          d.resolve(window.d3);
        });
      }

      // Create a script tag with d3 as the source
      // and call our onScriptLoad callback when it
      // has been loaded
      var scriptTag = $document[0].createElement('script');
      scriptTag.type = 'text/javascript';
      scriptTag.async = true;
      scriptTag.src = 'http://d3js.org/d3.v3.min.js';
      scriptTag.onreadystatechange = function () {
        if (this.readyState === 'complete') {
          onScriptLoad();
        }
      };
      scriptTag.onload = onScriptLoad;

      var s = $document[0].getElementsByTagName('body')[0];
      s.appendChild(scriptTag);

      return {
        d3: function () {
          return d.promise;
        }
      };
    }]);

  module.directive('swissMap', ['d3Service', '$window', '$rootScope', 'MunicipalitiesService', function (d3Service, $window, $rootScope, MunicipalitiesService) {
    return {
      priority: 10,
      restrict: 'E',
      link: function (scope) {
        d3Service.d3().then(function (d3) {

          var width = $('#map').parent().width(),
            scale = width * 17,
            mapRatio = 0.625,
            height = width * mapRatio,
            maxHeight = $(window).height() - ($('#topnav').outerHeight()+$('#filter').outerHeight()),
            thresholds = [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000],
            contour;

          if (height > maxHeight) {
            height = maxHeight;
            width = height / mapRatio;
            scale = width * 17;
          }

          var interpolateColor = d3.interpolateHcl('#94BF8B', '#F5F4F2');

          var color = d3.scale.threshold()
            .domain(thresholds)
            .range(d3.range(thresholds.length + 1).map(function (d, i) {
              return interpolateColor(i / thresholds.length);
            }));

          var projection = d3.geo.albers()
            .rotate([0, 0])
            .center([8.3, 46.8])
            .scale(scale)
            .translate([width / 2, height / 2])
            .precision(0.1);

          function calcKmPerPixel(){
            //Bern
            var bern=[7.461928,46.953525], projPoint1 = projection(bern);
            //Zürich
            var zurich=[8.541336,47.372047], projPoint2 = projection(zurich);
            //Distances
            var distancePixels = (Math.sqrt( ((projPoint2[0]-projPoint1[0])*(projPoint2[0]-projPoint1[0])) + ((projPoint2[1]-projPoint1[1])*(projPoint2[1]-projPoint1[1]))  ));
            /*
             Calculated from: http://www.freemaptools.com/how-far-is-it-between-bern_-schweiz-and-zürich_-schweiz.htm
             JavaScript from: http://stackoverflow.com/questions/27928/how-do-i-calculate-distance-between-two-latitude-longitude-points
             function distance(lat1, lon1, lat2, lon2) {
              var deg2rad = 0.017453292519943295; // === Math.PI / 180
              var cos = Math.cos;
              lat1 *= deg2rad;
              lon1 *= deg2rad;
              lat2 *= deg2rad;
              lon2 *= deg2rad;
              var diam = 12742; // Diameter of the earth in km (2 * 6371)
              var dLat = lat2 - lat1;
              var dLon = lon2 - lon1;
              var a = (
                        (1 - cos(dLat)) +
                        (1 - cos(dLon)) * cos(lat1) * cos(lat2)
                      ) / 2;
              return diam * Math.asin(Math.sqrt(a));
             }
            */
            var distanceKM = 94.936;
            return (distanceKM/distancePixels);
          }
          var kmPerPixel=calcKmPerPixel();

          var path = d3.geo.path().projection(projection);

          var svg = d3.select('#map').append('svg')
            .attr('width', width)
            .attr('height', height);

          var map = svg.append('g');

            d3.json('assets/topojson/ch-contours.json', function (error, topology) {
              contour = map.append('svg')
                .attr('id', 'contours')
                .selectAll('.contour')
                .data(topojson.feature(topology, topology.objects.contours).features)
                .enter().append('path')
                .attr('class', 'contour')
                .attr('d', path)
                .style('fill', function (d) {
                  return color(d.id);
                });
            });


            d3.json('assets/topojson/ch.json', function (error, ch) {
              map.append('svg')
                .attr('id', 'cantons')
                .selectAll('path')
                .data(topojson.feature(ch, ch.objects.cantons).features)
                .enter().append('path')
                .attr('class', 'canton-boundaries')
                .attr('id', function (d) {
                  return d.properties.abbr;
                })
                .attr('d', path);

              map.append('path')
                .attr('id', 'lakes')
                .datum(topojson.mesh(ch, ch.objects.lakes))
                .attr('class', 'lakes')
                .attr('d', path);

              setCities();
              if ($rootScope.appConfig.showMunicipalities) {
                setMunicipalities();
              }
            });

          function setMyLocation() {
            $rootScope.$watchCollection('myCoords', function () {
              if ($rootScope.myCoords !== undefined) {
                var classLocation = 'my-location';
                var xy = projection([$rootScope.myCoords.lon, $rootScope.myCoords.lat]);
                svg.append('circle')
                  .attr({
                    cx: xy[0],
                    cy: xy[1],
                    r: 3
                  }).attr('class', classLocation).attr('id', classLocation);
                setUmkreisInternal();
              }
            });
          }

          function setCurrentLocation(location){
            $('.current-location').remove();

            svg.append('circle')
              .attr({
                cx: location[0],
                cy: location[1],
                r: 2
              }).attr('class', 'current-location');

            svg.append('svg:image')
              .attr('class','current-location')
              .attr('width', 20)
              .attr('height', 20)
              .attr('xlink:href','/assets/images/map-marker-icon.png')
              .attr('transform', 'translate(' + location + ')')
              .attr('x', -10).attr('y', -20);
          }

          function setUmkreisInternal() {
            if (scope.searchParams.currentCoords !== undefined) {
              $('#heatmap').remove();
              $('#current-radius').remove();
              $('#my-radius').remove();
              $('#municipalities').remove();

              var xy = projection([scope.searchParams.currentCoords.lon, scope.searchParams.currentCoords.lat]);
              // Set Umkreis
              if (scope.searchParams.distanceType==='distance') {
                svg.append('circle')
                  .attr({
                    cx: xy[0],
                    cy: xy[1],
                    r: (scope.searchParams.distance/kmPerPixel)
                  }).attr('class', 'radius').attr('id', 'current-radius');
              }

              // Set Municipalities
              if ($rootScope.appConfig.showMunicipalities && scope.searchParams.distanceType === 'distance') {
                setMunicipalities();
              }

              // Set Marker
              setCurrentLocation(xy);
            }
          }

          function setCities() {
            // remove circle from dom
            $('.city-boundaries').remove();
            $('.city-text').remove();

            d3.json('assets/topojson/cities.json', function (cities) {
              var cityMap = map.append('svg')
                .attr('id', 'cities');

              drawLocations(cities,cityMap,'city');
            });
          }

          function setMunicipalities() {
            // remove circle from dom
            $('#municipalities').remove();

            var municipalityMap = map.append('svg')
              .attr('id', 'municipalities');

            if (scope.searchParams.distanceType==='distance'){
              getMunicipalitiesFromCoords(municipalityMap);
            }
            else {
              getMunicipalitiesFromZips(municipalityMap);
            }
          }

          function getMunicipalitiesFromCoords(municipalityMap){
            MunicipalitiesService.getMunicipalities(scope.searchParams.currentCoords,scope.searchParams.distance).success(function(result){
              var geoJSON = {
                type: 'GeometryCollection',
                geometries: []
              };
              angular.forEach(result.hits.hits, function (municipality) {
                var point={
                  type: 'Point',
                  coordinates: [municipality._source.locations.geoLocation[0].coords.lon,municipality._source.locations.geoLocation[0].coords.lat],
                  properties: {
                    name: municipality._source.name
                  }
                };

                geoJSON.geometries.push(point);
              });
              drawLocations(geoJSON,municipalityMap,'municipality');
            })
              .error(function(error){
                // todo error handling
                console.log(error);
                return false;
              });
          }


          function getMunicipalitiesFromZips(municipalityMap){
            MunicipalitiesService.getMunicipalitiesFromZips(scope.searchParams.zips).success(function(result){
              var geoJSON = {
                type: 'GeometryCollection',
                geometries: []
              };
              angular.forEach(result.hits.hits, function (municipality) {
                var point={
                  type: 'Point',
                  coordinates: [municipality._source.locations.geoLocation[0].coords.lon,municipality._source.locations.geoLocation[0].coords.lat],
                  properties: {
                    name: municipality._source.name
                  }
                };

                geoJSON.geometries.push(point);
              });
              drawLocations(geoJSON,municipalityMap,'municipality');
            })
              .error(function(error){
                // todo error handling
                console.log(error);
                return false;
              });
          }

          function drawLocations(cities,cityMap,classPrefix){
            cityMap.selectAll('g')
              .data(cities.geometries)
              .enter().append('svg:circle')
              .attr('transform', function(d) {
                return 'translate(' + projection(d.coordinates) + ')';
              })
              .attr('r', 3)
              .attr('class', classPrefix+'-boundaries');

            /*cityMap.selectAll("g")
              .data(cities.geometries)
              .enter().append("text")
              .attr("class", "pl ace-label")
              .attr("transform", function(d) { return "translate(" + projection(d.coordinates) + ")"; })
              .attr("dy", "1.25em")
              .text(function(d) { return d.properties.name; });*/


            cityMap.selectAll('g')
              .data(cities.geometries)
              .enter().append('text')
              .attr('transform', function(d) {
                return 'translate(' + projection(d.coordinates) + ')';
              })
              .attr('dy', '1.25em')
              .attr('class', classPrefix+'-text')
              .text(function (d) {
                return d.properties.name;
              });
          }

          function resize() {
            // adjust things when the window size changes
            width = $('#map').parent().width();
            height = width * mapRatio;

            if (height > maxHeight) {
              height = maxHeight;
              width = height / mapRatio;
              scale = width * 17;
            }

            // update projection
            projection
              .translate([width / 2, height / 2])
              .scale(width * 15);

            kmPerPixel=calcKmPerPixel();

            // resize the map container
            svg
              .style('width', width + 'px')
              .style('height', height + 'px');

            // resize the map
            svg.selectAll('.contour').attr('d', path);
            svg.selectAll('.canton-boundaries').attr('d', path);
            svg.selectAll('.lakes').attr('d', path);
            svg.selectAll('.heatmap').attr('d', path);

            svg.selectAll('.city-boundaries').attr('d', path);
            svg.selectAll('.city-text').attr('d', path);

            $('.my-location').remove();
            setMyLocation();
          }

          window.onresize = function () {
            resize();
          };

          d3.select(window).on('resize', resize());

          d3.select('svg').on('mousedown.log', function () {
            var coords = projection.invert(d3.mouse(this));
            scope.setCurrentCoords({lon: coords[0], lat: coords[1]});
          });

          scope.$watchCollection('searchParams.distance', function () {
            $('#heatmap').remove();
            $('.radius').show();
            $('.radius').attr('r', (scope.searchParams.distance/kmPerPixel));
            // Set Municipalities
            if ($rootScope.appConfig.showMunicipalities) {
              setMunicipalities();
            }
          });

          function addPolygon(geoJSON, outline) {
            $('#heatmap').remove();
            $('.radius').hide();

            map.append('svg')
              .attr('id', 'heatmap')
              .selectAll('g')
              .data(geoJSON.geometries)
              .enter().append('path')
              .attr('class', function (d) {
                if (d.properties.id === outline - 1) {
                  return 'heatmap heatmap-outline';
                }
                else {
                  return 'heatmap area' + d.properties.id;
                }
              })
              .attr('d', path);
          }

          //** ALL AREA MAP
          scope.$watchCollection('heatmap', function () {
            if (scope.heatmap !== undefined) {
              var geometries = [];
              var coordinates = [[], []];
              var type = 'MultiPolygon';

              angular.forEach(scope.heatmap.areas, function (area, id) {
                // calculate polygon
                var polygons = area.polygons.sort(function (a, b) {
                  return b[0] - a[0];
                });

                // reset coordinates
                coordinates = [[], []];

                angular.forEach(polygons, function (polygon) {
                  var i, exterior=[],interior=[];

                  for (i = 1; i < polygon.length; i += 2) {
                    if (polygon[0] === 1) {
                      exterior.push([polygon[i], polygon[i + 1]]);
                    }
                    else {
                      interior.push([polygon[i], polygon[i + 1]]);
                    }
                  }

                  if (type==='Polygon') {
                    //** Polygon
                    exterior.reverse();
                    exterior.push(exterior[0]);
                    coordinates.push(exterior);
                  }
                  else {
                    //** MultiPolygon
                    if (polygon[0] === 1) {
                      if (exterior.length > 0) {
                        //** exterior ring
                        if (id===0) {
                          exterior.reverse();
                        }

                        exterior.push(exterior[0]);
                        coordinates[0].push(exterior);
                      }
                    }
                    else {
                      if (interior.length > 0) {
                        //** interior ring
                        interior.push(interior[0]);
                        if (id===6) {
                          coordinates[1].push(interior);
                        }
                      }
                    }
                  }
                });

                var polygon = {
                  'type': type,
                  'properties': {
                    'id': id
                  },
                  'coordinates': coordinates
                };
                geometries.push(polygon);

              });

              var geoJSON = {
                'type': 'GeometryCollection',
                'bbox': [scope.heatmap.bbox.xmin, scope.heatmap.bbox.ymin, scope.heatmap.bbox.xmax, scope.heatmap.bbox.ymax],
                'geometries': geometries
              };
              addPolygon(geoJSON, scope.heatmap.areas.length);
            }
          });

          scope.$watchCollection('searchParams.currentCoords', function () {
              setUmkreisInternal();
          });

          scope.$watchCollection('searchParams.distanceType', function (newValue, oldValue) {
            if (newValue!==oldValue && scope.searchParams.distanceType==='distance') {
              setUmkreisInternal();
            }
          });

          scope.$watchCollection('searchParams.zips', function() {
            if ($rootScope.appConfig.showMunicipalities) {
              setMunicipalities();
            }
          });
        });
      }
    };
  }]);

  module.directive('keyboard',function(){
    return {
      priority: 100,
      require : '?ngModel',
      restrict : 'C',
      link : function(scope,element,attrs,ngModelCtrl){
        if(!ngModelCtrl){
          return;
        }

        element.click(function(){
          element.getkeyboard().reveal();
        });

        $(element).keyboard({
          layout : 'custom',
          display : {
            'b': 'backspace',
            'a': 'check',
            'c': 'clear'
          },
          customLayout: {'default':[
            '{clear} {b}',
            '7 8 9',
            '4 5 6',
            '1 2 3',
            '0 {a} {c}'
          ]},
          accepted : function(event, keyboard, el){
            var zip = el.value;
            if (zip.length<4){
              zip=scope.searchParams.currentZip;
            }
            scope.setCurrentZip(zip);
          },
          canceled : function(){
            scope.setCurrentZip(scope.searchParams.currentZip);
          },
          beforeVisible: function(){
            // set keyboard x/y according to element
            $('#location_keyboard').css('top',element.offset().top+element.outerHeight(true));
            $('#location_keyboard').css('left',element.offset().left);
            // reset value
            ngModelCtrl.$setViewValue(null);
            ngModelCtrl.$render();
          },
          maxLength: 4,
          restrictInput : true, // Prevent keys not in the displayed keyboard from being typed in
          preventPaste : true,  // prevent ctrl-v and right click
          autoAccept : false,
          usePreview: false,
          stayOpen : true
        });
      }
    };
  });

  module.directive('languageSwitcher', ['$translate', 'supportedLanguages', function ($translate,supportedLanguages) {
    return {
      restrict: 'E',
      templateUrl: 'template/core/language-switcher.html',
      replace: true,
      link: function (scope, element, attrs) {
        scope.styleClass = element.attr('class');
        scope.style = element.attr('style');

        // put supported languages into allLanguages array
        scope.allLanguages = [];

        if (attrs.languages) {
          var tokens = attrs.languages.split(',');
          for (var i = 0; i < tokens.length; i++) {
            scope.allLanguages[i] = tokens[i].trim();
          }
        } else {
          scope.allLanguages = supportedLanguages;
        }


        scope.getTranslationLanguage = function () {
          return $translate.use();
        };

        scope.setTranslationLanguage = function (language) {
          $translate.use(language);
        };
      }
    };
  }]);

  module.directive('infiniteScroll',['$window','$document',function($window,$document){
    return {
      priority: 100,
      restrict : 'A',
      link : function(scope, element, attrs){
        var height=$document.height() - element.offset().top;
        var elementHeight=0;
        var itemClass = attrs.infinteScrollItem || 'detail';

        element.css('height',height);

        element.scroll(function() {
          if (elementHeight===0){
            elementHeight=Math.ceil($(itemClass+':nth-last-child(5)').offset().top-$document.outerHeight(true));
          }
          if (elementHeight<element.scrollTop() && !scope.idle){
            scope.loadMoreResults();
            elementHeight=Math.ceil($(itemClass+':nth-last-child(5)').offset().top-$document.outerHeight(true));
          }
        });

        // reset scroll state when jobs are updated after filtering/sorting
        scope.$watchCollection('jobs', function () {
          if (scope.searchParams.from === 0) {
            elementHeight = 0;
            element.scrollTop(0);
          }
        });
      }
    };
  }]);
}());
