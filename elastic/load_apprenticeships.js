;(function () {
  var loader = require('./loader/dataLoader.js');

  loader.createAndLoad('apprenticeships', 'ID', 'data/apprenticeships.csv', ',', 450);

}());
