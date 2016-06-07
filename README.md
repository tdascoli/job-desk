Job-Desk
========

[![Code Climate](https://codeclimate.com/github/alv-ch/job-desk/badges/gpa.svg)](https://codeclimate.com/github/alv-ch/job-desk) [![Stack Share](http://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](http://stackshare.io/alv-ch/job-desk) [![Build Status](https://travis-ci.org/alv-ch/job-desk.svg?branch=dev)](https://travis-ci.org/alv-ch/job-desk)

Job search frontend made for internet terminals.

pilot: http://pilot.job-desk.ch

development: http://dev.job-desk.ch

poc denmark: http://jobdesk-dascoli.rhcloud.com / github: https://github.com/tdascoli/job-desk

Labour market
-------------

### ISCO
https://de.wikipedia.org/wiki/International_Standard_Classification_of_Occupations

### Swissdoc
http://www.swissdoc.sdbb.ch/

Geolocation
-----------

### Topojson
* Swiss Maps: https://github.com/interactivethings/swiss-maps
* Create a Map: http://bost.ocks.org/mike/map/
* General: https://github.com/mbostock/topojson/wiki
* geo.admin.ch API: https://api3.geo.admin.ch/

### GeoJSON
http://geojson.org/

### Leaflet
* map: http://leafletjs.com/
* tiles: https://leaflet-extras.github.io/leaflet-providers/preview/
* wiki tiles: https://www.mediawiki.org/wiki/Maps
* osm.de tiles: http://openstreetmap.de/
* swisstopo
 * tiles: https://api3.geo.admin.ch/
 * tutorial: https://www.procrastinatio.org/2014/11/16/native-wmts-leaflet/

### Radius km/px calculation
* Calculated from: http://www.freemaptools.com/how-far-is-it-between-bern_-schweiz-and-zürich_-schweiz.htm
* JavaScript from: http://stackoverflow.com/questions/27928/how-do-i-calculate-distance-between-two-latitude-longitude-points

### PLZ and Coordinates
* Cadastre.ch - PLZ/Coordinates (Choose 'CSV (Excel) WGS84'): http://www.cadastre.ch/internet/kataster/de/home/services/service/plz.html
* PLZ -> Gemeinde Zuordnung - Ortschaftenverzeichnis der Schweiz: http://www.bfs.admin.ch/bfs/portal/de/index/infothek/nomenklaturen/blank/blank/gem_liste/04.html
* Räumliche Topologien (bfs.admin.ch > Regional > Statistische Grundlagen > Räumliche Gliederungen > Räumliche Topologien): http://www.bfs.admin.ch/bfs/portal/de/index/regionen/11/geo/raeumliche_typologien/00.html
* Todo: PLZ and PO Box, for example 3000 Bern or 8000 Zürich

### Arrlee - circum search by public transport system based on the official SBB timetable                                               
* http://www.arrlee.ch

### WalkScore API - circum search by traveltime (car, bike, walk, transport) 
* Travel Time HTTP API: https://www.walkscore.com/professional/travel-time-http-api.php

Techstack
---------

### Travis > Exoscale
* https://community.exoscale.ch/documentation/apps/quick-start/
* https://docs.travis-ci.com/user/deployment/exoscale

### Angular Material
https://material.angularjs.org

### Material Design
* General: https://design.google.com/
* Icons: https://www.google.com/design/icons/
* Iconfont: https://github.com/google/material-design-icons/tree/master/iconfont
* Spec: https://www.google.com/design/spec/material-design/introduction.html

### angular-presence
Detect user activity
https://github.com/katebe/angular-presence

### Elasticsearch

Query/Filter/Sort

* Query: https://www.elastic.co/guide/encordova/elasticsearch/reference/1.4/query-dsl.html
* Filter: https://www.elastic.co/guide/en/elasticsearch/reference/1.4/query-dsl-filters.html
  * GeoLocation: https://www.elastic.co/guide/en/elasticsearch/reference/1.4/query-dsl-geo-distance-filter.html
  * Geo Polygon Filer: https://www.elastic.co/guide/en/elasticsearch/reference/1.7/query-dsl-geo-polygon-filter.html
* Sort: https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-sort.html

* http://stackoverflow.com/questions/29741641/elasticsearch-starts-with-first-word-in-phrases 
* https://www.elastic.co/guide/en/elasticsearch/guide/current/configuring-analyzers.html
* http://stackoverflow.com/questions/19758335/error-when-trying-to-update-the-settings
```
{
    "settings": {
          "analysis": {
              "analyzer": {
                  "analyzer_startswith": {
                      "tokenizer": "keyword",
                      "filter": "lowercase"
                  }
              }
          }
    },
    "mappings": {
        "location": {
            "properties": {
                "name": {
                    "search_analyzer": "analyzer_startswith",
                    "index_analyzer": "analyzer_startswith",
                    "type": "string"
                }
            }
        }
    }
}
```

## Mobile-App

Android - currently public alpha
iOS - not yet published
Others - no plan for further os 

*Apache Cordova*

* https://cordova.apache.org/
* follow the steps (create folder called "app" or change path in Gruntfile.js): https://cordova.apache.org/#getstarted
* before running the app, run `$ grunt build-app`

*Android*

* Guide: https://cordova.apache.org/docs/de/6.x/guide/platforms/android/index.html
* Splashscreen: https://github.com/AlexDisler/cordova-splash
* Icons: https://github.com/AlexDisler/cordova-icon
* Build and Sign the App:
  * `$ cordova run android --release -- --keystore keystore-path/keystore-name.keystore --storePassword=password --alias=alias-name --password=password`
  * `$ zipalign -v 4 android-release-unaligned.apk project-name.apk` 

*iOS*

* Guide: https://cordova.apache.org/docs/de/6.x/guide/platforms/ios/index.html
* Splashscreen: https://github.com/AlexDisler/cordova-splash
* Icons: https://github.com/AlexDisler/cordova-icon
* Build and Sign the App:
  * ...
  * ...
  
