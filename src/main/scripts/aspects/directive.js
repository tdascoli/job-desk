;(function () {
  'use strict';

  var module = angular.module('job-desk.directive', []);

  module.directive('jsLoadingScreen', ['$animate', function ($animate) {
    function link( scope, element, attributes ) {
      // Due to the way AngularJS prevents animation during the bootstrap
      // of the application, we can't animate the top-level container; but,
      // since we added "ngAnimateChildren", we can animated the inner
      // container during this phase.
      // --
      // NOTE: Am using .eq(1) so that we don't animate the Style block.
      $animate.leave( element.children().eq( 0 ) ).then(
        function cleanupAfterAnimation() {
          // Remove the root directive element.
          element.remove();
          //$('#main').css('z-index','inherit');
          // Clear the closed-over variable references.
          scope = element = attributes = null;
        }
      );
    }
    return({
      link: link,
      restrict: 'C'
    });
  }]);

  module.directive('map', ['$rootScope', function ($rootScope) {
    return {
      restrict: 'C',
      priority: 50,
      link: function (scope, element, attrs) {
        // todo functions in controller/service?!
        function myPosition() {
          if (scope.searchParams.currentCoords !== undefined) {
            var latlng = [scope.searchParams.currentCoords.lat, scope.searchParams.currentCoords.lon];
            map.setView(latlng, map.getZoom());
            setLatLngLayer(position_layer, search_layer, latlng);
            doRadius();
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

        // todo attrs - eval??
        var mapId = attrs.id || 'map';
        var tiles = attrs.mapTiles || 'osm';
        var myCoords = attrs.mapLocation || {lat: $rootScope.myCoords.lat, lng: $rootScope.myCoords.lon};

        var res = [4000, 3750, 3500, 3250, 3000, 2750, 2500, 2250, 2000, 1750, 1500, 1250, 1000, 750, 650, 500, 250, 100, 50, 20, 10, 5, 2.5, 2, 1.5, 1, 0.5];
        proj4.defs('EPSG:21781','+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=600000 +y_0=200000 +ellps=bessel +towgs84=674.4,15.1,405.3,0,0,0,0 +units=m +no_defs');
        var scale = function(zoom) {
          return 1 / res[zoom];
        },
        crs = new L.Proj.CRS('EPSG:21781', '+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 ' + '+k_0=1 +x_0=600000 +y_0=200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs', {
          resolutions: res,
          origin: [420000, 350000]
        });

        // defaults
        var defaults = attrs.mapDefaults || {
            zoomControl: true,
            scrollWheelZoom: false,
            doubleClickZoom: true,
            maxBounds: [
              [45.5, 5.5],
              [48, 11]
            ]
          };

        //** tiles & zoom
        var initial_zoom = 9;
        var tile_layer = L.tileLayer('http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
          minZoom: 8, maxZoom: 12
        });
        /****  GEO.ADMIN.CH *****/
        if (tiles==='swisstopo'){
          tile_layer = new L.TileLayer('https://wmts6.geo.admin.ch/1.0.0/ch.swisstopo.pixelkarte-farbe/default/20140520/21781/{z}/{y}/{x}.jpeg', {
            scheme: 'xyz',
            maxZoom: res.length - 1,
            minZoom: 15,
            opacity: 0.75,
            attribution: 'Map data &copy; swisstopo'
          });

          defaults.crs=crs;
          defaults.scale=scale;

          initial_zoom=17;
        }
        /**** /GEO.ADMIN.CH *****/

        //** height/width -> fullscreen param?!
        element.css('width', $(document).width());
        element.css('height', ($(window).height() - ($('#topnav').outerHeight() + $('#filter').outerHeight())) - 25);
        if ($rootScope.mobile) {
          element.css('height', $(document).width());
        }

        //*** geo-layer (my-position)
        var geo_layer = L.featureGroup([]);

        //*** search-layer (heatmap, traveltime, radius, current position)
        var heatmap_layer = new L.GeoJSON(null, {
          onEachFeature: function (feature, layer) {
            layer.setStyle({className: 'heatmap ' + feature.properties.className});
          },
          clickable: false
        });
        var traveltime_layer = new L.GeoJSON(null, {
            className: 'traveltime',
            clickable: false
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
        var search_layer = L.featureGroup([heatmap_layer,traveltime_layer]);

        var map = L.map(mapId, defaults);
        if (tiles) {
          map.addLayer(tile_layer);
          map.setView(myCoords, initial_zoom);
        }

        map
          .addLayer(geo_layer.bringToBack())
          .addLayer(search_layer.bringToFront());

        geo_layer.addLayer(L.circleMarker(myCoords, {clickable: false, radius: 3, className: 'my-location'}));
        myPosition();

        map.on('click', function (e) {
          scope.setCurrentCoords({lon: e.latlng.lng, lat: e.latlng.lat});
        });

        scope.$watchCollection('searchParams.currentCoords', function () {
          if (search_layer.hasLayer(position_layer)) {
            myPosition();
          }
        });

        scope.$watchCollection('searchParams.distanceType', function (newValue, oldValue) {
          if (newValue !== oldValue && scope.searchParams.distanceType === 'distance') {
            heatmap_layer.clearLayers();
            traveltime_layer.clearLayers();
            doRadius();
          }
          else if (newValue !== oldValue && scope.searchParams.distanceType === 'transport') {
            traveltime_layer.clearLayers();
            if (search_layer.hasLayer(radius_layer)) {
              search_layer.removeLayer(radius_layer);
            }
          }
          else if (newValue !== oldValue && (scope.searchParams.distanceType === 'drive' || scope.searchParams.distanceType === 'bike')) {
            heatmap_layer.clearLayers();
            if (search_layer.hasLayer(radius_layer)) {
              search_layer.removeLayer(radius_layer);
            }
          }
        });

        scope.$watchCollection('searchParams.distance', function () {
          if (search_layer.hasLayer(radius_layer)) {
            radius_layer.setRadius((scope.searchParams.distance * 1000));
          }
        });

        // todo traveltime/heatmap?? naming!! travelTime!==drive??
        scope.$watchCollection('traveltime', function () {
          if (scope.traveltime !== undefined) {
            traveltime_layer.clearLayers();
            traveltime_layer.addData(scope.traveltime.response.geometry);
          }
        });

        scope.$watchCollection('searchValues.heatmap', function () {
          if (scope.searchValues.heatmap !== undefined) {
            var geometries = [];
            var coordinates = [[], []];
            var type = 'MultiPolygon';

            angular.forEach(scope.searchValues.heatmap.areas, function (area, id) {
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

  module.directive('numkey', function () {
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

  module.directive('alphakey', function () {
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
            'c': 'clear',
            'default': 'ABC',
            'meta1': 'àéè',
            'meta2': 'âëç'
          },
          customLayout: {
            'default': [
              'Q W E R T Z U I O P Ü',
              'A S D F G H J K L Ö Ä',
              'Y X C V B N M . -  {b}',
              '{meta1} {space} {meta1} {a} {c}'
            ],
            'meta1': [
              'Q W Ë R T Z U I O P È',
              'Â S D F G H J K L É À',
              'Y X Ç V B N M . -  {b}',
              '{default} {space} {default} {a} {c}'
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
