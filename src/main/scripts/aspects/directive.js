;(function () {
  'use strict';

  var module = angular.module('job-desk.directive', []);

  module.directive('map', ['$rootScope', 'MunicipalitiesService', function ($rootScope, MunicipalitiesService) {
    return {
      restrict: 'C',
      priority: 50,
      link: function (scope, element, attrs) {
        // todo attrs - eval??
        var mapId = attrs.id || 'map';
        var tiles = attrs.mapTiles || false;
        var defaults = attrs.mapDefaults || {
            center: [46.8, 8.3],
            zoom: 8,
            zoomControl: true,
            scrollWheelZoom: false,
            doubleClickZoom: true,
            maxBounds: [
              [45.5, 5.5],
              [48, 11]
            ]
          };
        if ($rootScope.mobile) {
          defaults.zoom = 9;
        }

        //** tiles
        var tile_layer = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          minZoom: 8, maxZoom: 12
        });

        //** height/width -> fullscreen param?!
        element.css('width', $(document).width());
        element.css('height', ($(window).height() - ($('#topnav').outerHeight() + $('#filter').outerHeight())) - 25);
        if ($rootScope.mobile) {
          element.css('height', $(document).width());
        }

        //*** geo-layer (contours, cantons, lakes, cities and my-position)
        var colorScale = chroma.scale(['94BF8B', 'F5F4F2']).domain([0, 4000]).mode('hcl');
        var contour_layer = new L.TopoJSON(null, {
          clickable: false,
          className: 'contour',
          style: function (feature) {
            return {fillColor: colorScale(feature.id).hex()};
          }
        });
        var canton_layer = new L.TopoJSON(null, {
          clickable: false,
          className: 'canton-boundaries'
        });
        var lake_layer = new L.TopoJSON(null, {
          clickable: false,
          className: 'lakes'
        });
        var cities_layer = new L.GeoJSON(null, {
          pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
              clickable: false,
              radius: 3,
              className: 'city-boundaries'
            }).bindLabel(feature.geometry.properties.name, {noHide: true, className: 'city-text'});
          }
        });
        var geo_layer = L.featureGroup([contour_layer, canton_layer, lake_layer, cities_layer]);

        //*** search-layer (heatmap, radius, current position, municipalities)
        var heatmap_layer = new L.GeoJSON(null, {
          onEachFeature: function (feature, layer) {
            layer.setStyle({className: 'heatmap ' + feature.properties.className});
          }
        });
        var radius_layer = new L.circle(null, (scope.searchParams.distance * 1000), {
          clickable: false,
          className: 'radius'
        });
        var position_icon = L.divIcon({
          className: 'material-icons current-location',
          html: 'place'
        });
        var position_layer = new L.marker(null, {
          icon: position_icon,
          clickable: false
        });
        var my_position_layer = new L.circleMarker(null, {
          clickable: false,
          radius: 3,
          className: 'my-location'
        });
        var municipalities_layer = new L.GeoJSON(null, {
          pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
              clickable: false,
              radius: 3,
              className: 'municipality-boundaries'
            }).bindLabel(feature.geometry.properties.name, {
              noHide: true,
              direction: 'auto',
              className: 'municipality-text'
            });
          }
        });
        var search_layer = L.featureGroup([heatmap_layer]);

        var map = L.map(mapId, defaults);

        if (tiles) {
          map.addLayer(tile_layer);
        }

        map
          .addLayer(geo_layer.bringToBack())
          .addLayer(search_layer.bringToFront());

        $.getJSON('assets/topojson/ch-contours.json', function (data) {
          contour_layer.addData(topojson.feature(data, data.objects.contours));

          $.getJSON('assets/topojson/ch-cantons-lakes.json', function (data) {
            canton_layer.addData(topojson.feature(data, data.objects.cantons));
            lake_layer.addData(topojson.feature(data, data.objects.lakes));

            $.getJSON('assets/topojson/cities.json', function (data) {
              cities_layer.addData(data);
              if ($rootScope.myCoords!==undefined){
                geo_layer.addLayer(L.circleMarker([$rootScope.myCoords.lat, $rootScope.myCoords.lon], {clickable: false, radius: 3, className: 'my-location'}));
                myPosition();
              }
            });
          });
        });

        map.on('click', function (e) {
          scope.setCurrentCoords({lon: e.latlng.lng, lat: e.latlng.lat});
        });

        function myPosition() {
          if (scope.searchParams.currentCoords !== undefined) {
            var latlng = [scope.searchParams.currentCoords.lat, scope.searchParams.currentCoords.lon];
            map.setView(latlng, map.getZoom());
            setLatLngLayer(position_layer, search_layer, latlng);
            doRadius();
            if ($rootScope.appConfig.showMunicipalities) {
              setMunicipalities();
            }
          }
        }

        function doRadius() {
          if (scope.searchParams.currentCoords !== undefined && scope.searchParams.distanceType === 'distance') {
            var latlng = [scope.searchParams.currentCoords.lat, scope.searchParams.currentCoords.lon];
            setLatLngLayer(radius_layer, search_layer, latlng);
          }
        }

        function setLatLngLayer(layer, layerGroup, latlng) {
          layer.setLatLng(latlng);

          if (!layerGroup.hasLayer(layer)) {
            layerGroup.addLayer(layer);
          }
        }

        function setMunicipalities() {
          if (scope.searchParams.currentCoords !== undefined) {
            if (scope.searchParams.distanceType === 'distance') {
              MunicipalitiesService.getMunicipalitiesGeoJSON(scope.searchParams.currentCoords, scope.searchParams.distance, function (result) {
                setMunicipalitiesLayer(result);
              });
            }
            else {
              MunicipalitiesService.getMunicipalitiesFromZipsGeoJSON(scope.searchParams.zips, function (result) {
                setMunicipalitiesLayer(result);
              });
            }
          }
        }

        function setMunicipalitiesLayer(data) {
          municipalities_layer.clearLayers();
          municipalities_layer.addData(data);

          if (!search_layer.hasLayer(municipalities_layer)) {
            search_layer.addLayer(municipalities_layer).bringToFront();
          }
        }

        scope.$watchCollection('searchParams.currentCoords', function () {
          if (search_layer.hasLayer(position_layer)) {
            myPosition();
          }
        });

        scope.$watchCollection('myCoords', function () {
          if ($rootScope.myCoords!==undefined) {
            setLatLngLayer(my_position_layer, geo_layer, [$rootScope.myCoords.lat, $rootScope.myCoords.lon]);
          }
        });

        scope.$watchCollection('searchParams.distanceType', function (newValue, oldValue) {
          if (newValue !== oldValue && scope.searchParams.distanceType === 'distance') {
            heatmap_layer.clearLayers();
            doRadius();
          }
          else if (newValue !== oldValue && scope.searchParams.distanceType !== 'distance') {
            if (search_layer.hasLayer(radius_layer)) {
              search_layer.removeLayer(radius_layer);
            }
          }
        });

        scope.$watchCollection('searchParams.distance', function () {
          if (search_layer.hasLayer(radius_layer)) {
            radius_layer.setRadius((scope.searchParams.distance * 1000));
            if ($rootScope.appConfig.showMunicipalities) {
              setMunicipalities();
            }
          }
        });

        scope.$watchCollection('searchParams.zips', function () {
          if ($rootScope.appConfig.showMunicipalities) {
            setMunicipalities();
          }
        });

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
                var i, exterior = [], interior = [];

                for (i = 1; i < polygon.length; i += 2) {
                  if (polygon[0] === 1) {
                    exterior.push([polygon[i], polygon[i + 1]]);
                  }
                  else {
                    interior.push([polygon[i], polygon[i + 1]]);
                  }
                }

                if (type === 'Polygon') {
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
                      if (id === 0) {
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
                      if (id === 6) {
                        coordinates[1].push(interior);
                      }
                    }
                  }
                }
              });

              var polygon = {
                'type': type,
                'properties': {
                  'id': id,
                  'className': 'area' + id
                },
                'coordinates': coordinates
              };
              geometries.push(polygon);

            });

            heatmap_layer.clearLayers();
            heatmap_layer.addData(geometries);
          }
        });
      }
    };
  }]);

  module.directive('keyboard', function () {
    return {
      priority: 100,
      require: '?ngModel',
      restrict: 'C',
      link: function (scope, element, attrs, ngModelCtrl) {
        if (!ngModelCtrl) {
          return;
        }

        element.click(function () {
          element.getkeyboard().reveal();
        });

        $(element).keyboard({
          layout: 'custom',
          display: {
            'b': 'backspace',
            'a': 'OK',
            'c': 'clear'
          },
          customLayout: {
            'default': [
              '{clear} {b}',
              '7 8 9',
              '4 5 6',
              '1 2 3',
              '{a} 0 {c}'
            ]
          },
          accepted: function (event, keyboard, el) {
            var zip = el.value;
            if (zip.length < 4) {
              zip = scope.searchParams.currentZip;
            }
            scope.setCurrentZip(zip);
          },
          canceled: function () {
            scope.setCurrentZip(scope.searchParams.currentZip);
          },
          beforeVisible: function () {
            // set keyboard x/y according to element
            $('#location_keyboard').css('top', element.offset().top + element.outerHeight(true));
            $('#location_keyboard').css('left', element.offset().left);
            // reset value
            ngModelCtrl.$setViewValue(null);
            ngModelCtrl.$render();
          },
          maxLength: 4,
          restrictInput: true, // Prevent keys not in the displayed keyboard from being typed in
          preventPaste: true,  // prevent ctrl-v and right click
          autoAccept: false,
          usePreview: false,
          stayOpen: false
        });
      }
    };
  });

  module.directive('languageSwitcher', ['$translate', 'supportedLanguages', function ($translate, supportedLanguages) {
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

  module.directive('infiniteScroll', ['$window', '$document', function ($window, $document) {
    return {
      priority: 100,
      restrict: 'A',
      link: function (scope, element, attrs) {
        var height = $document.height() - element.offset().top;
        var elementHeight = 0;
        var itemClass = attrs.infinteScrollItem || 'detail';

        element.css('height', height);

        element.scroll(function () {
          if (elementHeight === 0) {
            elementHeight = Math.ceil($(itemClass + ':nth-last-child(5)').offset().top - $document.outerHeight(true));
          }
          if (elementHeight < element.scrollTop() && !scope.idle) {
            scope.loadMoreResults();
            elementHeight = Math.ceil($(itemClass + ':nth-last-child(5)').offset().top - $document.outerHeight(true));
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
