;(function () {
  var loader = require('./loader/dataLoader.js');

  loader.updateEducations('educationsSwissdoc', 'ID', 'data/educations_swissdoc.csv', '|', 430);

}());
