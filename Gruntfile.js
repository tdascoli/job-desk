'use strict';
var fs = require('fs');
var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;


// usemin custom step
var useminAutoprefixer = {
  name: 'autoprefixer',
  createConfig: function (context, block) {
    if (block.src.length === 0) {
      return {};
    } else {
      return require('grunt-usemin/lib/config/cssmin').createConfig(context, block) // Reuse cssmins createConfig
    }
  }
};

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt, {
    pattern: ['grunt-*', '!grunt-template-jasmine-istanbul']
  });
  require('time-grunt')(grunt);

  grunt.initConfig({
    yeoman: {
      // configurable paths
      app: require('./bower.json').appPath || 'app',
      dist: 'dist'
    },
    autoprefixer: {
      // src and dest is configured in a subtask called "generated" by usemin
    },
    wiredep: {
      app: {
        src: ['src/main/index.html']
      }
    },
    watch: {
      styles: {
        files: ['src/main/assets/styles/**/*.css']
      },
      jshint: {
        files: 'src/main/scripts/**/*.js',
        tasks: ['jshint']
      },
      livereload: {
        options: {
          livereload: 35729
        },
        files: [
          'src/main/**/*.html',
          'src/main/**/*.json',
          '{.tmp/,}src/main/assets/styles/**/*.css',
          '{.tmp/,}src/main/scripts/**/*.js',
          'src/main/assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: [
            'src/main/**/*.html',
            'src/main/**/*.json',
            'src/main/assets/styles/**/*.css',
            'src/main/assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
            'src/main/scripts/**/*.js',
            'tmp/**/*.{css,js}'
          ]
        }
      },
      dist: {
        bsFiles: {
          src: [
            'dist/**/*.*'
          ]
        },
        options: {
          watchTask: true,
          injectChanges: true,
          open: true,
          port: 3000,
          ui: {
            port: 3001
          }
        }
      },
      options: {
        watchTask: true
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'src/main/scripts/**/*.js'
      ]
    },
    concat: {
      // src and dest is configured in a subtask called "generated" by usemin
    },
    uglifyjs: {
      // src and dest is configured in a subtask called "generated" by usemin
    },
    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/**/*.js',
            '<%= yeoman.dist %>/assets/styles/**/*.css',
            '<%= yeoman.dist %>/assets/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= yeoman.dist %>/assets/fonts/*'
          ]
        }
      }
    },
    useminPrepare: {
      html: 'src/main/**/*.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin', useminAutoprefixer] // Let cssmin concat files so it corrects relative paths to fonts and images
            },
            post: {}
          }
        }
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/**/*.html'],
      css: ['<%= yeoman.dist %>/assets/styles/**/*.css'],
      js: ['<%= yeoman.dist %>/scripts/**/*.js'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>', '<%= yeoman.dist %>/assets/styles', '<%= yeoman.dist %>/assets/images', '<%= yeoman.dist %>/assets/fonts'],
        patterns: {
          js: [
            [/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
          ]
        },
        dirs: ['<%= yeoman.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/main/assets/images',
          src: '**/*.{jpg,jpeg}', // we don't optimize PNG files as it doesn't work on Linux. If you are not on Linux, feel free to use '**/*.{png,jpg,jpeg}'
          dest: '<%= yeoman.dist %>/assets/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/main/assets/images',
          src: '**/*.svg',
          dest: '<%= yeoman.dist %>/assets/images'
        }]
      }
    },
    cssmin: {
      // src and dest is configured in a subtask called "generated" by usemin
    },
    ngtemplates: {
      dist: {
        cwd: 'src/main',
        src: ['assets/templates/**/*.html'],
        dest: '.tmp/templates/templates.js',
        options: {
          module: 'job-desk',
          usemin: 'scripts/app.js',
          htmlmin: {
            removeCommentsFromCDATA: true,
            // https://github.com/yeoman/grunt-usemin/issues/44
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            conservativeCollapse: true,
            removeAttributeQuotes: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true
          }
        }
      },
      test: {
        cwd: 'src/main/',
        src: ['assets/templates/**/*.html','views/**/*.html'],
        dest: 'src/test/templates/templates.js',
        options: {
          module: 'job-desk'
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          keepClosingSlash: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    // Put files not handled in other tasks here
    copy: {
      fonts: {
        files: [{
          expand: true,
          dot: true,
          flatten: true,
          cwd: 'src/main',
          dest: '<%= yeoman.dist %>/assets/fonts',
          src: [
            'bower_components/bootstrap/fonts/*.*'
          ]
        },
        {
          expand: true,
          dot: true,
          flatten: true,
          cwd: 'src/main/private/fonts',
          dest: '<%= yeoman.dist %>/assets/fonts',
          src: [
            'adminchsymbols/*.*'
          ]
        }]
      },
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: 'src/main',
            dest: '<%= yeoman.dist %>',
            src: [
              '*.html',
              'scripts/**/*.html',
              'assets/images/**/*.{png,gif,webp,jpg,jpeg,svg}',
              'assets/fonts/*'
            ]
          },
          {
            expand: true,
            cwd: '.tmp/assets/images',
            dest: '<%= yeoman.dist %>/assets/images',
            src: [
              'generated/*'
            ]
          },
          {
            expand: true,
            cwd: 'src/main/i18n',
            dest: '<%= yeoman.dist %>/i18n',
            src: [
              '**/*.json'
            ]
          },
          {
            expand: true,
            cwd: 'src/main/views',
            dest: '<%= yeoman.dist %>/views',
            src: [
              '*.html', '**/*.html'
            ]
          },
          {
            expand: true,
            cwd: 'src/main/assets/templates',
            dest: '<%= yeoman.dist %>/assets/templates',
            src: [
              '*.html', '**/*.html'
            ]
          },
          {
            expand: true,
            cwd: 'src/main/assets/topojson',
            dest: '<%= yeoman.dist %>/assets/topojson',
            src: [
              '*.json'
            ]
          }
        ]
      }
    },
    connect: {
      proxies: [
        {
          context: '/jobdesk',
          host: 'localhost',
          port: 9200,
          https: false,
          changeOrigin: false
        }
      ],
      options: {
        port: 9000,
        // Change this to 'localhost' to deny access to the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            'src/main'
          ],
          middleware: function (connect) {
            return [
              proxySnippet,
              connect.static('.tmp'),
              connect.static('src/main')
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          base: [
            '.tmp',
            'test',
            'src/main'
          ]
        }
      },
      dist: {
        options: {
          open: true,
          base: 'dist',
          middleware: function (connect) {
            return [
              proxySnippet,
              connect.static('dist')
            ];
          }
        }
      }
    },
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },
    ngconstant: {
      options: {
        name: 'job-desk',
        deps: false,
        wrap: '"use strict";\n// DO NOT EDIT THIS FILE, EDIT THE GRUNT TASK NGCONSTANT SETTINGS INSTEAD WHICH GENERATES THIS FILE\n{%= __ngModule %}'
      },
      dev: {
        options: {
          dest: 'src/main/scripts/app/app.constants.js'
        },
        constants: {
          ENV: 'dev',
          VERSION: '<%= yeoman.app.version %>',
          baseUrl: 'http://jobdesk-alvchegov.rhcloud.com/jobdesk',
          supportedLanguages: ['de', 'fr', 'it', 'en']
        }
      },
      prod: {
        options: {
          dest: '.tmp/scripts/app/app.constants.js'
        },
        constants: {
          ENV: 'prod',
          VERSION: '<%= yeoman.app.version %>',
          baseUrl: 'http://jobdesk-alvchegov.rhcloud.com/jobdesk',
          supportedLanguages: ['de', 'fr']
        }
      }
    },
    jasmine: {
      unit: {
        src: [
          'src/main/scripts/app/app.js',
          'src/main/scripts/app/app.constants.js',
          'src/main/scripts/aspects/i18n.js',
          'src/main/scripts/aspects/directive.js',
          'src/main/scripts/app/localInfo/localInfo.js',
          'src/main/scripts/app/localInfo/localInfo.controller.js',
          'src/main/scripts/app/apprenticeships/apprenticeships.js',
          'src/main/scripts/app/apprenticeships/apprenticeships.service.js',
          'src/main/scripts/app/apprenticeships/apprenticeships.controller.js',
          'src/main/scripts/app/educations/educations.js',
          'src/main/scripts/app/educations/educations.service.js',
          'src/main/scripts/app/educations/educations.controller.js',
          'src/main/scripts/app/jobs/jobs.js',
          'src/main/scripts/app/jobs/jobs.service.js',
          'src/main/scripts/app/jobs/jobs.controller.js',
          'src/main/scripts/app/jobs/jobs.directive.js',
          'src/main/scripts/components/locations/locations.service.js',
          'src/test/templates/templates.js'
        ],
        options: {
          specs: ['src/test/unit/**/*.unit.spec.js'],
          vendor: [
            'dist/scripts/*.vendor.js',
            'src/main/bower_components/angular-mocks/angular-mocks.js'
          ],
          version: '2.0.0',
          template: require('grunt-template-jasmine-istanbul'),
          templateOptions: {
            coverage: 'build/coverage/coverage.json',
            report: [
              {
                type: 'html',
                options: {
                  dir: 'build/coverage/reports/html'
                }
              },
              {
                type: 'lcov',
                options: {
                  dir: 'build/coverage/reports/lcov'
                }
              },
              {
                type: 'text-summary'
              }
            ]
          }
        }
      }
    },
    protractor: {
      options: {
        keepAlive: true,
        configFile: "test/protractor.conf.js"
      },
      run: {}
    },
    protractor_webdriver: {
      start: {
        options: {
          path: 'node_modules/protractor/bin/',
          command: 'webdriver-manager start'
        }
      }
    }
  });

  grunt.registerTask('serve', [
    'clean:server',
    'wiredep',
    'ngconstant:dev',
    'configureProxies',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('test', [
    'ngtemplates:test',
    'wiredep:app',
    'jasmine'
  ]);

  grunt.registerTask('protractor', [
    'clean:server',
    'wiredep:app',
    'ngconstant:dev',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma',
    'protractor_webdriver',
    'protractor:run'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'wiredep:app',
    'ngconstant:prod',
    'useminPrepare',
    'ngtemplates:dist',
    'imagemin',
    'svgmin',
    'concat',
    'copy:fonts',
    'copy:dist',
    'ngAnnotate',
    'cssmin',
    'autoprefixer',
    'uglify',
    'rev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'test',
    'build'
  ]);
};
