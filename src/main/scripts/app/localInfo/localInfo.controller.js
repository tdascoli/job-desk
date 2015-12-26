'use strict';

angular.module('job-desk')
    .controller('LocalInfoController', function ($scope,$rootScope,leafletData) {

      angular.extend($scope, {
        center: {
          lat: 46.8,
          lng: 8.3,
          zoom: 8
        },
        paths: {
          myCoords: {
            latlngs: {lat: $rootScope.myCoords.lat, lng: $rootScope.myCoords.lon},
            type: 'circleMarker',
            radius: 3,
            className: 'my-location',
            clickable: false,
            label: {
              message: 'Hey, you cant drag me if you want',
              options: {
                noHide: true,
                className: 'city-text'
              }
            }
          }
        },
        defaults: {
          tileLayer: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
          tileLayerOptions: {
            opacity: 0.75,
            detectRetina: true,
            reuseTiles: true
          },
          zoomControl: false,
          scrollWheelZoom: false,
          doubleClickZoom: true,
          minZoom: 8,
          maxZoom: 12,
          maxBounds: [
            [45.5, 5.5],
            [48, 11]
          ]
        }
      });

      $scope.$on('leafletDirectiveMap.click', function(e){
        console.log(e,e.latlng);
        //$scope.setCurrentCoords({lon: coords[0], lat: coords[1]});
      });

      //****** GEO TOPO JSON ******//
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
          }).bindLabel(feature.geometry.properties.name, { noHide: true, className: 'city-text' });
        }
      });

      $.getJSON('assets/topojson/ch-cantons-lakes.json', function (data) {
        var canton_geojson = topojson.feature(data, data.objects.cantons),
          lake_geojson = topojson.feature(data, data.objects.lakes);

        canton_layer.addData(canton_geojson);
        lake_layer.addData(lake_geojson);

        $.getJSON('assets/topojson/cities.json', function (data) {
          cities_layer.addData(data);

          //L.circleMarker([46.119,8.71], { clickable: false, radius: 3, className: 'my-location' }).addTo(map);
          //doRadius([46.119,8.71]);
        });
      });

      /*map.on('click', function (e) {
        //alert(e.latlng);
        myPosition(e.latlng, 'current-location');
      });*/

      /* myPosition(latlng){
        if (currentPosition===undefined){
          currentPosition=L.marker(latlng, { clickable: false, radius: 3, className: 'current-location' }).addTo(map);
        }
        else {
          currentPosition.setLatLng(latlng);
        }
        //doRadius(latlng);
      }

      function doRadius(latlng){
        if (currentRadius===undefined){
          currentRadius= L.circle(latlng, 30000, {
            clickable: false,
            className: 'radius'
          }).addTo(map);
        }
        else {
          currentRadius.setLatLng(latlng);
        }
      } */

      leafletData.getMap().then(function(map) {
        window.leafletMap = map;
        map
          .addLayer(canton_layer)
          .addLayer(lake_layer)
          .addLayer(cities_layer);

        map.on('click', function (e) {
          alert(e.latlng);
          //myPosition(e.latlng, 'current-location');
        });
      });

    });
