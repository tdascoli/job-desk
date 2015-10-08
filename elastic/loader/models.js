;(function() {

  exports.jobs = {
    "jobs": {
      "properties": {
        "fingerprint": {
          "type": "string"
        },
        "identifier": {
          "type":"object",
          "properties": {
            "avam": {
              "type":"string"
            },
            "egov": {
              "type":"string"
            }
          }
        },
        "url": {
          "type":"string"
        },
        "title": {
          "type":"object",
          "properties": {
            "de": {
              "type": "string"
            },
            "fr": {
              "type": "string"
            },
            "it": {
              "type": "string"
            },
            "en": {
              "type": "string"
            }
          }
        },
        "description": {
          "type":"object",
          "properties": {
            "de": {
              "type": "string"
            },
            "fr": {
              "type": "string"
            },
            "it": {
              "type": "string"
            },
            "en": {
              "type": "string"
            }
          }
        },
        "isco": {
          "type":"object",
          "properties": {
            "majorGroup": {
              "type": "string"
            },
            "groupLevel2": {
              "type": "string"
            },
            "groupLevel3": {
              "type": "string"
            },
            "groupLevel4": {
              "type": "string"
            }
          }
        },
        "locations": {
          "type":"object",
          "properties":{
            "location": {
              "type":"nested",
              "properties": {
                "coords": {
                  "type": "geo_point"
                },
                "zip": {
                  "type": "integer"
                }
              }
            },
            "remarks": {
              "type": "object",
              "properties": {
                "de": {
                  "type": "string"
                },
                "fr": {
                  "type": "string"
                },
                "it": {
                  "type": "string"
                },
                "en": {
                  "type": "string"
                }
              }
            }
          }
        },
        "fulltime": {
          "type": "boolean"
        },
        "external": {
          "type": "boolean"
        },
        "source": {
          "type": "string"
        },
        "publicationDate": {
          "type":"date",
          "format" : "MM/dd/yyyy HH:mm:ss"
        },
        "quotaFrom": {
          "type": "short"
        },
        "quotaTo": {
          "type": "short"
        },
        "availableNow": {
          "type":"boolean"
        },
        "permanentJob": {
          "type":"boolean"
        },
        "startDate": {
          "type": "string"
        },
        "endDate": {
          "type": "string"
        },
        "languages": {
          "properties": {
            "languageCode": {
              "type": "short"
            },
            "writtenCode": {
              "type": "short"
            },
            "spokenCode": {
              "type": "short"
            }
          }
        },
        "application": {
          "type":"object",
          "properties": {
            "written": {
              "type": "boolean"
            },
            "electronical": {
              "type": "boolean"
            },
            "electronicalAddress": {
              "type": "string"
            },
            "phone": {
              "type": "boolean"
            },
            "phoneNumber": {
              "type": "string"
            },
            "personal": {
              "type": "boolean"
            }
          }
        },
        "company": {
          "type":"object",
          "properties": {
            "name": {
              "type": "string"
            },
            "address": {
              "type":"object",
              "properties": {
                "street": {
                  "type": "string"
                },
                "streetAppendix": {
                  "type": "string"
                },
                "zip": {
                  "type": "string"
                },
                "location": {
                  "type": "string"
                },
                "country": {
                  "type": "string"
                }
              }
            },
            "phone": {
              "type":"string"
            },
            "eMail": {
              "type":"string"
            },
            "url": {
              "type":"string"
            }
          },
          "poAddress": {
            "type":"object",
            "properties": {
              "poBox": {
                "type": "string"
              },
              "zip": {
                "type": "string"
              },
              "location": {
                "type": "string"
              },
              "country": {
                "type": "string"
              }
            }
          }
        },
        "contact": {
          "type":"object",
          "properties": {
            "gender": {
              "type": "string"
            },
            "firstName": {
              "type": "string"
            },
            "lastName": {
              "type": "string"
            },
            "phone": {
              "type": "string"
            },
            "eMail": {
              "type": "string"
            }
          }
        }
      }
    }
  };

  exports.apprenticeships = {
    "apprenticeships": {
      "properties": {
        "id": {
          "type":"integer"
        },
        "titleM": {
          "type":"object",
          "properties": {
            "de": {
              "type": "string"
            },
            "fr": {
              "type": "string"
            },
            "it": {
              "type": "string"
            },
            "en": {
              "type": "string"
            }
          }
        },
        "titleW": {
          "type":"object",
          "properties": {
            "de": {
              "type": "string"
            },
            "fr": {
              "type": "string"
            },
            "it": {
              "type": "string"
            },
            "en": {
              "type": "string"
            }
          }
        },
        "description": {
          "type":"object",
          "properties": {
            "de": {
              "type": "string"
            },
            "fr": {
              "type": "string"
            },
            "it": {
              "type": "string"
            },
            "en": {
              "type": "string"
            }
          }
        },
        "amount": {
          "type": "integer"
        },
        "company": {
          "type":"object",
          "properties": {
            "id": {
              "type": "integer"
            },
            "name": {
              "type": "string"
            },
            "nameAppendix": {
              "type": "string"
            },
            "address": {
              "type":"object",
              "properties": {
                "street": {
                  "type": "string"
                },
                "zip": {
                  "type": "string"
                },
                "location": {
                  "type": "string"
                }
              }
            },
            "contact":{
              "type":"object",
              "properties": {
                "fullName": {
                  "type":"string"
                },
                "phone": {
                  "type":"string"
                },
                "eMail": {
                  "type":"string"
                }
              }
            },
            "url": {
              "type":"string"
            }
          }
        },
        "swissdoc": {
          "type": "string"
        },
        "languages": {
          "type": "string"
        },
        "geoLocation": {
          "type": "geo_point"
        }
      }
    }
  };

  exports.locations = {
    "locations":{
      "properties": {
        "name": {
          "type":"string"
        },
        "zip": {
          "type":"integer"
        },
        "additionalNumber": {
          "type":"short"
        },
        "municipalityName": {
          "type":"string"
        },
        "canton": {
          "type":"string"
        },
        "geoLocation": {
          "type": "geo_point"
        }
      }
    }
  };

  exports.educations={
    "educations":{
      "properties":{
        "id":{
          "type":"integer"
        },
        "title":{
          "type":"string"
        },
        "content":{
          "type":"string"
        },
        "target":{
          "type":"string"
        },
        "comments":{
          "type":"object",
          "properties": {
            "offers":{
              "type":"string"
            },
            "class":{
              "type":"string"
            }
          }
        },
        "categories": {
          "type":"nested",
          "properties": {
            "swissdoc": {
              "type": "string"
            }
          }
        },
        "precondtions":{
          "type":"string"
        },
        "languages":{
          "type":"string"
        },
        "activity":{
          "type":"string"
        },
        "cost":{
          "type":"string"
        },
        "duration":{
          "type":"string"
        },
        "startText":{
          "type":"string"
        },
        "endDate":{
          "type":"string"
        },
        "location":{
          "type":"object",
          "properties": {
            "name":{
              "type":"string"
            },
            "zip":{
              "type":"string"
            },
            "coords":{
              "type":"geoPoint"
            }
          }
        },
        "provider":{
          "type":"object",
          "properties": {
            "email":{
              "type":"string"
            },
            "fax":{
              "type":"string"
            },
            "name":{
              "type":"string"
            },
            "mobile":{
              "type":"string"
            },
            "phone":{
              "type":"string"
            },
            "url":{
              "type":"string"
            },
            "address":{
              "type":"object",
              "properties":{
                "street":{
                  "type":"string"
                },
                "streetAppendix":{
                  "type":"string"
                }
              }
            },
            "contact":{
              "type":"object",
              "properties":{
                "firstName":{
                  "type":"string"
                },
                "lastName":{
                  "type":"string"
                }
              }
            }
          }
        }
      }
    }
  };

  exports.codes = {
    "codes":{
      "properties": {
        "domain": {
          "type":"string"
        },
        "sequence": {
          "type":"integer"
        },
        "code": {
          "type":"string"
        },
        "text": {
          "type": "object",
          "properties": {
            "de": {
              "type": "string"
            },
            "fr": {
              "type": "string"
            },
            "it": {
              "type": "string"
            },
            "en": {
              "type": "string"
            }
          }
        }
      }
    }
  };

  exports.municipalities = {
    "municipalities":{
      "properties": {
        "bfsnr": {
          "type":"integer"
        },
        "name": {
          "type":"string"
        },
        "languageRegion": {
          "type":"short"
        },
        "communitySize": {
          "type":"short"
        },
        "city": {
          "type":"boolean"
        },
        "initial": {
          "type":"boolean"
        },
        "locations": {
          "type":"object",
          "properties":{
            "geoLocation": {
              "type":"nested",
              "properties": {
                "coords": {
                  "type": "geo_point"
                },
                "zip": {
                  "type": "integer"
                }
              }
            }
          }
        }
      }
    }
  };

}());




