;(function () {
  var loader = require('./loader/dataLoader.js');

  loader.createAndLoad('jobs', 'ID', 'data/jobroom-osteavam.csv', '|', 430);

}());
