'use strict';
var fs = require('fs');

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
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    yeoman: {
      // configurable paths
      app: require('./bower.json').appPath || 'app',
      dist: 'dist'
    },
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      ngconstant: {
        files: ['Gruntfile.js'],
        tasks: ['ngconstant:dev']
      }
    },
    autoprefixer: {
      // src and dest is configured in a subtask called "generated" by usemin
    },
    wiredep: {
      app: {
        src: ['src/main/index.html']
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
        }
      },
      options: {
        watchTask: true,
        proxy: "localhost:8080"
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
        src: ['scripts/app/**/*.html', 'scripts/components/**/*.html',],
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
          cwd: 'src/main/assets',
          dest: '<%= yeoman.dist %>/fonts',
          src: [
            'bower_components/bootstrap/fonts/*.*'
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
          },
        ]
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
          VERSION: '<%= yeoman.app.version %>'
        }
      },
      prod: {
        options: {
          dest: '.tmp/scripts/app/app.constants.js'
        },
        constants: {
          ENV: 'prod',
          VERSION: '<%= yeoman.app.version %>'
        }
      }
    }
  });

  grunt.registerTask('serve', [
    'clean:server',
    'wiredep',
    'ngconstant:dev',
    'browserSync',
    'watch'
  ]);

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('test', [
    'clean:server',
    'wiredep:test',
    'ngconstant:dev',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'wiredep:app',
    'ngconstant:prod',
    'useminPrepare',
    'ngtemplates',
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

  grunt.registerTask('appendSkipBower', 'Force skip of bower for Gradle', function () {

    if (!grunt.file.exists(filepath)) {
      // Assume this is a maven project
      return true;
    }

    var fileContent = grunt.file.read(filepath);
    var skipBowerIndex = fileContent.indexOf("skipBower=true");

    if (skipBowerIndex != -1) {
      return true;
    }

    grunt.file.write(filepath, fileContent + "\nskipBower=true\n");
  });

  grunt.registerTask('buildOpenshift', [
    'test',
    'build',
    'copy:generateOpenshiftDirectory',
  ]);

  grunt.registerTask('deployOpenshift', [
    'test',
    'build',
    'copy:generateOpenshiftDirectory',
    'buildcontrol:openshift'
  ]);

  grunt.registerTask('default', [
    'test',
    'build'
  ]);
};
