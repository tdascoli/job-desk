;(function () {
  var loader = require('./loader/dataLoader.js');

  loader.createAndLoad('jobs', 'FINGERPRINT', 'data/jobs.csv', '|', 500);

}());
