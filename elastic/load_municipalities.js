;(function () {
  var loader = require('./loader/dataLoader.js');

  // todo load zips!!
  loader.createAndLoad('municipalities', 'BFSNR', 'data/municipalities.csv', '|');

}());

