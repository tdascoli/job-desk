;(function () {
  var loader = require('./loader/dataLoader.js');

  loader.createAndLoad('educations', 'ID', 'data/educations.csv', '|', 430);

}());
