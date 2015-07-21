;(function () {
  var elasticsearch = require('elasticsearch');
  var lazy = require("lazy");
  var fs = require("fs");
  var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
  });

  var index = 'jobdesk';
  var type = 'codes';
  var skipFirstLine = true;

  var counter = 0;

  new lazy(fs.createReadStream('./codes.csv'))
    .lines
    .forEach(function(line){
      if (!skipFirstLine || (skipFirstLine && counter > 0)) {
        var lineString = line.toString().replace(/['"]+/g, '')
        var lineData = lineString.toString().split(';');
        client.index({
          index: index,
          type: type,
          id: lineData[0],
          body: {
            codeType: lineData[1],
            code:lineData[2],
            active: true,
            order: lineData[3],
            text: {
              de: lineData[4],
              fr: lineData[5],
              it: lineData[6]
            }
          }
        }, function (error, response) {

        });

      }
      counter++;
    }
  );



}());
