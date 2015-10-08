;(function () {
  var loader = require('./loader/dataLoader.js');

  loader.createAndLoad('jobs', 'ID', 'data/jobs_new.csv', '|', 430);

}());
