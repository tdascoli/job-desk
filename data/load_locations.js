;(function () {
  var elasticsearch = require('elasticsearch');
  var lazy = require("lazy");
  var fs = require("fs");
  var client = new elasticsearch.Client({
    host: 'http://jobdesk-alvchegov.rhcloud.com/jobdesk',
    log: 'trace'
  });

  var index = 'jobdesk';
  var type = 'locations';
  var skipFirstLine = true;

  var counter = 0;

  new lazy(fs.createReadStream('./PLZO_CSV_WGS84.csv'))
    .lines
    .forEach(function(line){
      if (!skipFirstLine || (skipFirstLine && counter > 0)) {
        var lineString = line.toString().replace(/['"]+/g, '')
        var lineData = lineString.toString().split(';');
        client.index({
          index: index,
          type: type,
          body: {
            name: lineData[0],
            zip: lineData[1],
            additionalNumber: lineData[2],
            municipalityName: lineData[3],
            canton: lineData[4],
            geoLocation: {
              lon: lineData[5],
              lat: lineData[6]
            }
          }
        }, function (error, response) {

        });

      }
      counter++;
    }
  );



}());
