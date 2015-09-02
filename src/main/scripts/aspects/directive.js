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

  module.directive('swissMap', ['d3Service', '$window', '$rootScope', function (d3Service, $window, $rootScope) {
    return {
      priority: 10,
      restrict: 'E',
      link: function (scope) {
        d3Service.d3().then(function (d3) {

          var width = $('#map').parent().width(),
            scale = width * 17,
            mapRatio = 0.625,
            height = width * mapRatio,
            maxHeight = $(window).height() - ($('#topnav').outerHeight(true) + $('#filter').outerHeight(true)),
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
          });

          function setMyLocation() {
            $rootScope.$watch('myCoords', function () {
              if ($rootScope.myCoords !== undefined) {
                var classLocation = 'my-location';
                var xy = projection([$rootScope.myCoords.lon, $rootScope.myCoords.lat]);
                svg.append('circle')
                  .attr({
                    cx: xy[0],
                    cy: xy[1],
                    r: 3
                  }).attr('class', classLocation).attr('id', classLocation);
                setUmkreisInternal(false);
              }
            });
          }

          function setUmkreisInternal(location) {
            if (scope.searchParams.currentCoords !== undefined) {
              $('#heatmap').remove();

              // remove circle from dom
              $('#current-radius').remove();
              $('#current-location').remove();
              // remove radius from current location
              $('#my-radius').remove();

              var classLocation = 'current-location';
              var classRadius = 'current-radius';
              var radiusLocation = 2;
              if (location) {
                classLocation = 'my-location';
                classRadius = 'my-radius';
                radiusLocation = 3;
              }

              var xy = projection([scope.searchParams.currentCoords.lon, scope.searchParams.currentCoords.lat]);

              svg.append('circle')
                .attr({
                  cx: xy[0],
                  cy: xy[1],
                  r: radiusLocation
                }).attr('class', classLocation).attr('id', classLocation);

              if (scope.searchParams.distanceType==='distance') {
                svg.append('circle')
                  .attr({
                    cx: xy[0],
                    cy: xy[1],
                    r: (scope.searchParams.distance * 2)
                  }).attr('class', 'radius').attr('id', classRadius);
              }
            }
          }

          function setCities() {
            // remove circle from dom
            $('.city-boundaries').remove();
            $('.city-text').remove();

            d3.json('assets/topojson/cities.json', function (cities) {
              for (var i = 0; i < cities.length; i++) {
                var coordinates = projection(cities[i].geometry.coordinates);
                svg.append('svg:circle')
                  .attr('cx', coordinates[0])
                  .attr('cy', coordinates[1])
                  .attr('r', 3)
                  .attr('class', 'city-boundaries')
                  .text(cities[i].properties.name);

                svg.append('text')
                  .attr('transform', 'translate(' + projection(cities[i].geometry.coordinates) + ')')
                  .attr('dy', '1.25em')
                  .attr('class', 'city-text')
                  .text(cities[i].properties.name);
              }
            });
          }

          window.onresize = function () {
            resize();
          };

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

            // resize the map container
            svg
              .style('width', width + 'px')
              .style('height', height + 'px');

            // resize the map
            svg.selectAll('.canton-boundaries').attr('d', path);
            svg.selectAll('.contour').attr('d', path);
            svg.selectAll('.lakes').attr('d', path);
            svg.selectAll('.heatmap').attr('d', path);


            $('.my-location').remove();
            setCities();
            setMyLocation();
          }

          d3.select(window).on('resize', resize());

          d3.select('svg').on('mousedown.log', function () {
            var coords = projection.invert(d3.mouse(this));
            scope.setCurrentCoords({lon: coords[0], lat: coords[1]});
          });

          scope.$watch('searchParams.distance', function () {
            $('#heatmap').remove();
            $('.radius').show();
            $('.radius').attr('r', (scope.searchParams.distance * 2));
          });

          //** ALL AREA MAP
          scope.$watch('heatmap', function () {
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

          scope.$watch('searchParams.currentCoords', function () {
              setUmkreisInternal(false);
          });

          scope.$watch('searchParams.distanceType', function (newValue, oldValue) {
            if (newValue!==oldValue && scope.searchParams.distanceType==='distance') {
              setUmkreisInternal(false);
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
        // get element x/y
        var offset = element.offset();
        if(!ngModelCtrl){
          return;
        }

        element.click(function(){
          element.getkeyboard().reveal();
        });

        $(element).keyboard({
          layout : 'custom',
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
            $('#location_keyboard').css('top',offset.top+element.outerHeight(true));
            $('#location_keyboard').css('left',offset.left);
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
}());
