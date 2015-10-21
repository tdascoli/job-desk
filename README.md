job-desk DEV
============

[![Code Climate](https://codeclimate.com/github/alv-ch/job-desk/badges/gpa.svg)](https://codeclimate.com/github/alv-ch/job-desk) [![Stack Share](http://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](http://stackshare.io/alv-ch/job-desk) [![Build Status](https://travis-ci.org/alv-ch/job-desk.svg?branch=dev)](https://travis-ci.org/alv-ch/job-desk)

Job search frontend made for internet terminals.

## ISCO
https://de.wikipedia.org/wiki/International_Standard_Classification_of_Occupations

## Swissdoc
http://www.swissdoc.sdbb.ch/

## Topojson
* Swiss Maps: https://github.com/interactivethings/swiss-maps
* Create a Map: http://bost.ocks.org/mike/map/
* General: https://github.com/mbostock/topojson/wiki

## GeoJSON
http://geojson.org/

## Radius km/px calculation
* Calculated from: http://www.freemaptools.com/how-far-is-it-between-bern_-schweiz-and-zürich_-schweiz.htm
* JavaScript from: http://stackoverflow.com/questions/27928/how-do-i-calculate-distance-between-two-latitude-longitude-points

## PLZ and Coordinates
* Cadastre.ch - PLZ/Coordinates (Choose 'CSV (Excel) WGS84'): http://www.cadastre.ch/internet/kataster/de/home/services/service/plz.html
* PLZ -> Gemeinde Zuordnung - Ortschaftenverzeichnis der Schweiz: http://www.bfs.admin.ch/bfs/portal/de/index/infothek/nomenklaturen/blank/blank/gem_liste/04.html
* Räumliche Topologien (bfs.admin.ch > Regional > Statistische Grundlagen > Räumliche Gliederungen > Räumliche Topologien): http://www.bfs.admin.ch/bfs/portal/de/index/regionen/11/geo/raeumliche_typologien/00.html
* Todo: PLZ and PO Box, for example 3000 Bern or 8000 Zürich

## Angular Material
https://material.angularjs.org

## Material Design
* General: https://design.google.com/
* Icons: https://www.google.com/design/icons/
* Iconfont: https://github.com/google/material-design-icons/tree/master/iconfont
* Spec: https://www.google.com/design/spec/material-design/introduction.html

## Arrlee                                               
http://www.arrlee.ch

## Star TSP700II
* Drivers : http://www.starmicronics.com/support/default.aspx?printerCode=TSP700II

## AngularJS-PDF
(wip using the internal rendering engine, cause of cross-site scripting error)
* angularjs-pdf: https://github.com/sayanee/angularjs-pdf

## Elasticsearch

Query/Filter/Sort

* Query: https://www.elastic.co/guide/en/elasticsearch/reference/1.4/query-dsl.html
* FIlter: https://www.elastic.co/guide/en/elasticsearch/reference/1.4/query-dsl-filters.html
  * GeoLocation: https://www.elastic.co/guide/en/elasticsearch/reference/1.4/query-dsl-geo-distance-filter.html
* Sort: https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-sort.html

For moving and saving indicies

* Elasticsearch-dump: https://github.com/taskrabbit/elasticsearch-dump
* elasticsearch-tools: https://github.com/skratchdot/elasticsearch-tools#usage-es-export-bulk
* **Bulk API**: https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html
  * Export: `es-export-bulk --url http://[_url-to-elastic:_port] --file data.json --index [_index] --type [_type] --transformMeta 'delete data.index._score'`
  * Split into Chunks of 5000 lines (2500 operations): `split -l 5000 data.json data.json`
  * Import `curl -s -XPOST 'http://[_url-to-elastic:_port]/[_index]/[_type]/_bulk' --data-binary @data.jsonaa` until data.jsonXX
  * currently 2500 operations are OK
  
## angular-presence
Detect user activity
https://github.com/katebe/angular-presence
  
