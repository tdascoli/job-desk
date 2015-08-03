;(function () {
  var loader = require('./loader/dataLoader.js');

  loader.createAndLoad('locations', 'ID', 'data/location.csv', '|');

}());

