;(function () {
  var winston = require('winston');

  var elasticsearch = require('elasticsearch');
  var lazy = require("lazy");
  var fs = require("fs");
  var models = require("./models.js");
  var objectMapper = require("./objectMapper.js")
  var client = new elasticsearch.Client({
    host: 'jobdesk-alvchegov.rhcloud.com/',
    log: 'trace'
  });

  function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  }


  exports.createAndLoad = function (type, idParam, dataFile, delimiter, bulkSize) {

    var logger = new (winston.Logger)({
      transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: type + '-import_' + new Date().getMilliseconds() + '.log' })
      ]
    });

    var csv = require("fast-csv");
    var jobStream = fs.createReadStream(dataFile);
    var index = 'jobdesk';
    var mapperFn = objectMapper['map' + type];
    var finalDelimiter = delimiter || ";"
    var counter = 0;
    var finalBulkSize = bulkSize || 100;


    client.indices.deleteMapping({index: index, type: type}, function () {
      client.indices.putMapping({index: index, type: type, body: models[type]}, function () {
        var items = [];
        var csvStream = csv({
            delimiter: finalDelimiter,
            headers: true,
            trim: true,
            quote: '"'
          })
            .on("data", function (data) {
              var id;
              if (isFunction(idParam)) {
                id = idParam(data);
              } else {
                id = data[idParam];
              }

              items.push({index: {_index: index, _type: type, _id: id}});
              items.push(mapperFn(data));

              if (counter >= finalBulkSize) {
                client.bulk({
                  refresh: true,
                  consistency: 'one',
                  body: items
                }, function (err, resp) {
                  if (err) {
                    logger.warn(err, resp);
                  } else {
                    logger.info(resp);
                  }

                });
                counter = 0;
                items.length = 0;
              } else {
                counter++;
              }
            })
            .on('error', function (error) {
              logger.error("Catch an invalid csv file! Error: {}", error);
            })
            .on("end", function () {
              client.bulk({
                refresh: true,
                consistency: 'one',
                body: items
              }, function (err, resp) {
                if (err) {
                  logger.warn(err, resp);
                } else {
                  logger.info(resp);
                }
              });
              logger.info("done");
            })
          ;
        jobStream.pipe(csvStream);
      });
    });
  };

}());
