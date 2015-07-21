;(function () {
  var elasticsearch = require('elasticsearch');
  var lazy = require("lazy");
  var fs = require("fs");
  var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
  });

  var index = 'jobdesk';
  var type = 'jobs';
  var skipFirstLine = true;

  var counter = 0;

  new lazy(fs.createReadStream('./oste_x28.csv'))
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
            "fingerprint": lineData[0],
            "title": {
              "de": lineData[5],
              "fr": '[FR] ' + lineData[5],
              "it": '[IT] ' + lineData[5],
              "en": '[EN] ' + lineData[5]
            },
            "description": {
              "de": lineData[6],
              "fr": '[FR] ' + lineData[6],
              "it": '[IT] ' + lineData[6],
              "en": '[EN] ' + lineData[6]
            },
            "jobGroup": 1,
            "locations": [
              {
                "coords": {
                  "lng": 22,
                  "lat": 33
                },
                "zip": lineData[28],
                "remarks": {
                  "de": lineData[8],
                  "fr": '[FR] ' + lineData[8],
                  "it": '[FR] ' + lineData[8],
                  "en": '[FR] ' + lineData[8]
                }
              }
            ],
            "onlineSince": lineData[36],
            "quotaFrom": lineData[13],
            "quotaTo": lineData[14],
            "startDate": lineData[10],
            "endDate": lineData[11],
            "languages": [],
            "application": {
              "written": lineData[53],
              "electronical": lineData[54],
              "electronicalAddress": "tbi",
              "phone": lineData[55],
              "phoneNumber": "tbi",
              "personal": lineData[56]
            },
            "company": {
              "name": lineData[57],
              "address": {
                "street": lineData[58] +  ' ' + lineData[59],
                "streetAppendix": '',
                "zip": lineData[60],
                "location": lineData[61],
                "country": lineData[65]
              },
              "poAddress": {
                "poBox": lineData[62],
                "zip": lineData[63],
                "location": lineData[64]
              }
            },
            "contact": {
              "gender": lineData[69],
              "firstName": lineData[71],
              "lastName": lineData[70],
              "phone": lineData[72],
              "eMail": lineData[73]
            }
          }
        }, function (error, response) {

        });

      }
      counter++;
    }
  );



}());
