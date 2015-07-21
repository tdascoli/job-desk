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
            scale = width*17,
            mapRatio = 0.625,
            height = width * mapRatio,
            maxHeight = $(window).height()-($('#topnav').height()+$('#filter').height()+$('#navbottom').height()),
            thresholds = [500, 1000, 1500, 2000, 2500, 3000, 3500, 4000],
            contour;

          if (height>maxHeight) {
            height = maxHeight;
            width = height / mapRatio;
            scale = width*17;
          }

          var interpolateColor = d3.interpolateHcl("#94BF8B", "#F5F4F2");

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

          var svg = d3.select("#map").append("svg")
            .attr("width", width)
            .attr("height", height);

          var map = svg.append("g");

          d3.json("assets/topojson/ch-contours.json", function (error, topology) {
            contour = map.append("svg")
              .attr("id", "contours")
              .selectAll(".contour")
              .data(topojson.feature(topology, topology.objects.contours).features)
              .enter().append("path")
              .attr("class", "contour")
              .attr("d", path)
              .style("fill", function (d) {
                return color(d.id);
              });
          });

          d3.json("assets/topojson/ch.json", function (error, ch) {
            map.append("svg")
              .attr("id", "cantons")
              .selectAll("path")
              .data(topojson.feature(ch, ch.objects.cantons).features)
              .enter().append("path")
              .attr("class", "canton-boundaries")
              .attr("id", function (d) {
                return d.properties.abbr;
              })
              .attr("d", path);

            map.append("path")
              .attr("id", "lakes")
              .datum(topojson.mesh(ch, ch.objects.lakes))
              .attr("class", "lakes")
              .attr("d", path);
          });


          function setMyLocation() {
            $rootScope.$watch('myCoords', function () {
              if ($rootScope.myCoords!==undefined) {
                var classLocation = 'my-location';
                var xy = projection([$rootScope.myCoords.lng, $rootScope.myCoords.lat]);
                svg.append("circle")
                  .attr({
                    cx: xy[0],
                    cy: xy[1],
                    r: 3
                  }).attr("class", classLocation).attr("id", classLocation);
                setUmkreisInternal(false);
              }
            });
          }

          function setUmkreisInternal(location) {
            if (scope.currentCoords!==undefined) {
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

              var xy = projection([scope.currentCoords.lng, scope.currentCoords.lat]);

              svg.append("circle")
                .attr({
                  cx: xy[0],
                  cy: xy[1],
                  r: radiusLocation
                }).attr("class", classLocation).attr("id", classLocation);
              svg.append("circle")
                .attr({
                  cx: xy[0],
                  cy: xy[1],
                  r: (scope.searchParams.km * 2)
                }).attr("class", "radius").attr("id", classRadius);
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

                svg.append("text")
                  .attr("transform", "translate(" + projection(cities[i].geometry.coordinates) + ")")
                  .attr("dy", "1.25em")
                  .attr('class', 'city-text')
                  .text(cities[i].properties.name);
              }
            });
          }

          window.onresize = function(){
            resize();
          };

          function resize() {
            // adjust things when the window size changes
            width = $('#map').parent().width();
            height = width * mapRatio;

            if (height>maxHeight) {
              height = maxHeight;
              width = height / mapRatio;
              scale = width*17;
            }

            // update projection
            projection
              .translate([width / 2, height / 2])
              .scale(width*15);

            // resize the map container
            svg
              .style('width', width + 'px')
              .style('height', height + 'px');

            // resize the map
            svg.selectAll('.canton-boundaries').attr('d', path);
            svg.selectAll('.contour').attr('d', path);
            svg.selectAll('.lakes').attr('d', path);


            $('.my-location').remove();
            setCities();
            setMyLocation();
          }

          d3.select(window).on('resize', resize());

          d3.select("svg").on("mousedown.log", function () {
            var coords = projection.invert(d3.mouse(this));
            scope.setCurrentCoords({lng: coords[0], lat: coords[1]});
          });

          scope.$watch('searchParams.km', function () {
            $('.radius').attr('r', (scope.searchParams.km * 2));
          });

          scope.$watch('currentCoords', function () {
            if (scope.currentCoords!==undefined) {
              setUmkreisInternal(false);
            }
          });
        });
      }
    };
  }]);

}());
