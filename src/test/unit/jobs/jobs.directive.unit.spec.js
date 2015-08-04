;(function () {

    describe("job-desk - jobs.directive", function() {

      beforeEach(module('job-desk','stateMock', function($translateProvider, $provide){
        $provide.constant('supportedLanguages',['de', 'en']);
        $translateProvider.preferredLanguage('en');
      }));

      describe("help directive", function() {
        var $scope;
        var elem;

        beforeEach(inject(function($compile,$rootScope,$state) {
          state = $state;
          //initialize other stuff

          $scope = $rootScope.$new();
          elem  = angular.element('<help></help>');
          $compile(elem)($scope);
          $scope.$apply();
        }));

        it('renders the element as required',
          inject(function(){
            expect(elem.find('#help')).toBeTruthy();
            expect(elem.find('.example')).toBeTruthy();
          })
        );
      });

      describe("jobDetail directive", function() {
        var $scope;
        var elem;

        beforeEach(inject(function($compile,$rootScope,$state) {
          state = $state;
          $scope = $rootScope.$new();
          $scope.jobDetail = {_source:
                            {
                              fingerprint: '61004cab2c15994e0f5e64a4c9d377110d9b9081b8854098ee49782170df6fcd6c023c9dc62b758f',
                              identifier:
                              {
                                avam: '00000562860',
                                egov: ''
                              },
                              title:
                              {
                                de: 'ServicemitarbeiterIn',
                                fr: '[FR] ServicemitarbeiterIn',
                                it: '[IT] ServicemitarbeiterIn',
                                en: '[EN] ServicemitarbeiterIn'
                              },
                              description:
                              {
                                de: 'DESC',
                                fr: '[FR] DESC',
                                it: '[IT] DESC',
                                en: '[EN] DESC'
                              },
                              isco:
                              {
                                majorGroup: '5',
                                groupLevel2: '51',
                                groupLevel3: '513',
                                groupLevel4: '5131'
                              },
                              locations:
                              {
                                location:
                                [
                                  {
                                    coords:
                                    {
                                      lon: '8.448483',
                                      lat: '47.282178'
                                    },
                                    zip: '8910'
                                  }
                                ],
                                remarks:
                                {
                                  de: 'Affoltern am Albis',
                                  fr: '[FR] Affoltern am Albis',
                                  it: '[IT] Affoltern am Albis',
                                  en: '[EN] Affoltern am Albis'
                                }
                              },
                              fulltime: 'true',
                              external: 'false',
                              source: 'RAV',
                              onlineSince: '9',
                              quotaFrom: '100',
                              quotaTo: '100',
                              availableNow: '1',
                              permanentJob: '1',
                              startDate: '',
                              endDate: '',
                              languages:
                              [
                                {
                                  languageCode: '1',
                                  writtenCode: '1',
                                  spokenCode: '1'
                                }
                              ],
                              application:
                              {
                                written: '1',
                                electronical: '0',
                                electronicalAddress: '',
                                phone: '1',
                                phoneNumber: '+41 79 926 08 34',
                                personal: '0'
                              },
                              company:
                              {
                                name: 'Restaurant il Villagio',
                                address:
                                {
                                  street: 'Ottenbachstrasse 66',
                                  streetAppendix: '',
                                  zip: '8909',
                                  location: 'Zwillikon',
                                  country: 'CH'
                                },
                                poAddress:
                                {
                                  poBox: '',
                                  zip: '',
                                  location: ''
                                },
                                phone: '+41 79 926 08 34',
                                eMail: '',
                                url: ''
                              },
                              contact:
                              {
                                gender: '1',
                                firstName: 'Carlo',
                                lastName: 'Frey',
                                phone: '+41 79 926 08 34',
                                eMail: ''
                              }
                            }
                          };
          $scope.$apply();

          elem  = angular.element('<div job-detail="jobDetail"></div>');
          $compile(elem)($scope);
          $scope.$apply();
        }));

        it('renders the element as required',
          inject(function(){
            var isolatedScope = elem.isolateScope();
            expect(elem.find('.row')).toBeTruthy();
            expect(isolatedScope.showDetailContent).toBeFalsy();

            isolatedScope.showDetail();
            $scope.$apply();

            expect(isolatedScope.showDetailContent).toBeTruthy();
            expect(elem.find('.visited')).toBeTruthy();

          })
        );
      });

    });

}());
