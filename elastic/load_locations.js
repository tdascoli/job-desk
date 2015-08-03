;(function () {
  var loader = require('./loader/dataLoader.js');

  loader.createAndLoad('locations', function(data) { return data.CODE + '-' +  data.ZUSATZZIFFER + '-' + data.TEXT }, 'data/location.csv', '|');

}());

