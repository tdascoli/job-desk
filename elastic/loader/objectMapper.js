;
(function () {

  exports.mapjobs = function (data) {
    return {
      "fingerprint": data.FINGERPRINT,
      "identifier": {
        "avam":  data.STELLENNUMMER_AVAM,
        "egov":  data.STELLENNUMMER_EGOV
      },
      "title": {
        "de": data.BEZEICHNUNG,
        "fr": '[FR] ' + data.BEZEICHNUNG,
        "it": '[IT] ' + data.BEZEICHNUNG,
        "en": '[EN] ' + data.BEZEICHNUNG
      },
      "description": {
        "de": data.BESCHREIBUNG,
        "fr": '[FR] ' + data.BESCHREIBUNG,
        "it": '[IT] ' + data.BESCHREIBUNG,
        "en": '[EN] ' + data.BESCHREIBUNG
      },
      "isco":{
        "majorGroup": data.ISCO_08_GROUP1,
        "groupLevel2": data.ISCO_08_GROUP2,
        "groupLevel3": data.ISCO_08_GROUP3,
        "groupLevel4": data.ISCO_08_GROUP4
      },
      "locations": {
        "location": [
          {
            "coords": {
              "lon": data.LON,
              "lat": data.LAT
            },
            "zip": data.ARBEITSORT_PLZ
          }
        ],
        "remarks": {
          "de": data.ARBEITSORT_TEXT,
          "fr": '[FR] ' + data.ARBEITSORT_TEXT,
          "it": '[IT] ' + data.ARBEITSORT_TEXT,
          "en": '[EN] ' + data.ARBEITSORT_TEXT
        }
      },
      "fulltime": data.FULLTIME,
      "external": data.EXTERN,
      "source": data.SOURCE,
      "onlineSince": data.ONLINE_SEIT,
      "quotaFrom": data.PENSUM_VON,
      "quotaTo": data.PENSUM_BIS,
      "availableNow": data.AB_SOFORT_B,
      "permanentJob": data.UNBEFRISTET_B,
      "startDate": data.STELLENANTRITT,
      "endDate": data.VERTRAGSDAUER,
      "languages": [
        {
          "languageCode": data.SK1_SPRACHE_CODE,
          "writtenCode": data.SK1_MUENDLICH_CODE,
          "spokenCode": data.SK1_SCHRIFTLICH_CODE
        },
        {
          "languageCode": data.SK2_SPRACHE_CODE,
          "writtenCode": data.SK2_MUENDLICH_CODE,
          "spokenCode": data.SK2_SCHRIFTLICH_CODE
        },
        {
          "languageCode": data.SK3_SPRACHE_CODE,
          "writtenCode": data.SK3_MUENDLICH_CODE,
          "spokenCode": data.SK3_SCHRIFTLICH_CODE
        },
        {
          "languageCode": data.SK4_SPRACHE_CODE,
          "writtenCode": data.SK4_MUENDLICH_CODE,
          "spokenCode": data.SK4_SCHRIFTLICH_CODE
        },
        {
          "languageCode": data.SK5_SPRACHE_CODE,
          "writtenCode": data.SK5_MUENDLICH_CODE,
          "spokenCode": data.SK5_SCHRIFTLICH_CODE
        }
      ],
      "application": {
        "written": data.BEWER_SCHRIFTLICH_B,
        "electronical": data.BEWER_ELEKTRONISCH_B,
        "electronicalAddress": data.KP_EMAIL,
        "phone": data.BEWER_TELEFONISCH_B,
        "phoneNumber": data.KP_TELEFON_NR,
        "personal": data.BEWER_PERSOENLICH_B
      },
      "company": {
        "name": data.UNT_NAME,
        "address": {
          "street": data.UNT_STRASSE + ' ' + data.UNT_HAUS_NR,
          "streetAppendix": '',
          "zip": data.UNT_PLZ,
          "location": data.UNT_ORT,
          "country": data.UNT_LAND
        },
        "poAddress": {
          "poBox": data.UNT_POSTFACH,
          "zip": data.UNT_POSTFACH_PLZ,
          "location": data.UNT_POSTFACH_ORT
        },
        "phone": data.UNT_TELEFON,
        "eMail": data.UNT_EMAIL,
        "url": data.UNT_URL
      },
      "contact": {
        "gender": data.KP_ANREDE_CODE,
        "firstName": data.KP_VORNAME,
        "lastName": data.KP_NAME,
        "phone": data.KP_TELEFON_NR,
        "eMail": data.KP_EMAIL
      }
    };
  };

  exports.maplocations = function (data) {
    return {
      name: data.TEXT,
      zip: data.CODE,
      additionalNumber: data.ZUSATZZIFFER,
      municipalityName: data.GEMEINDE,
      municipalityNumber: data.BFS_NR,
      region: data.AVAM_SUCHREGION,
      canton: data.KANTON,
      geoLocation: {
        lon: data.LONGITUDE,
        lat: data.LATITUDE
      }
    };
  };

  exports.mapcodes = function (data) {
    return {
      domain: data.DOMAIN,
      sequence: data.ORDERS,
      code: data.CODE,
      text: {
        de: data.TEXT_DE,
        fr: data.TEXT_FR,
        it: data.TEXT_IT,
        en: '[EN] ' + data.TEXT_DE
      }
    };
  };
}());
