;(function () {
  var loader = require('./loader/dataLoader.js');

  loader.createAndLoad('locations', function(data) { return data.PLZ + '-' +  data.Zusatzziffer + '-' + data.Ortschaftsname }, 'data/PLZO_CSV_WGS84.csv');

}());

