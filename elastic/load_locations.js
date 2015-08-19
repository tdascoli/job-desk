;(function () {
  var loader = require('./loader/dataLoader.js');

  loader.createAndLoad('locations', 'ID', 'data/PLZO_CSV_WGS84.csv', ';');

}());

