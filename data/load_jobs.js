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

  new lazy(fs.createReadStream('./jobs.csv'))
    .lines
    .forEach(function(line){
      if (!skipFirstLine || (skipFirstLine && counter > 0)) {
        var lineString = line.toString().replace(/['"]+/g, '');
        var lineData = lineString.toString().split('|');
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
            "iscoMajorGroup": lineData[118],
            "iscoGroupLevel2": lineData[119],
            "locations": [
              {
                "coords": {
                  "lon": lineData[120],
                  "lat": lineData[121]
                },
                "zip": lineData[28],
                "remarks": {
                  "de": lineData[8],
                  "fr": '[FR] ' + lineData[26],
                  "it": '[FR] ' + lineData[26],
                  "en": '[FR] ' + lineData[26]
                }
              }
            ],
            "fulltime": lineData[115],
            "externalSource": lineData[116],
            "onlineSince": lineData[117],
            "quotaFrom": lineData[13],
            "quotaTo": lineData[14],
            "availableNow": lineData[10],
            "permanentJob": lineData[12],
            "startDate": lineData[9],
            "endDate": lineData[11],
            "languages": [
              {
                "languageCode": lineData[89],
                "writtenCode": lineData[90],
                "spokenCode": lineData[91]
              },
              {
                "languageCode": lineData[94],
                "writtenCode": lineData[95],
                "spokenCode": lineData[96]
              },
              {
                "languageCode": lineData[99],
                "writtenCode": lineData[100],
                "spokenCode": lineData[101]
              },
              {
                "languageCode": lineData[104],
                "writtenCode": lineData[105],
                "spokenCode": lineData[106]
              },
              {
                "languageCode": lineData[109],
                "writtenCode": lineData[110],
                "spokenCode": lineData[111]
              }
            ],
            "application": {
              "written": lineData[53],
              "electronical": lineData[54],
              "electronicalAddress": lineData[73],
              "phone": lineData[55],
              "phoneNumber": lineData[72],
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
              },
              "phone": lineData[66],
              "eMail": lineData[67],
              "url": lineData[68]
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
