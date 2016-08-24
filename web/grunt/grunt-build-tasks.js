'use strict';

module.exports = function (grunt, build_config) {

    var
        path = require('path'),
        _ = require('underscore'),
        libs_directory = path.join('libs'),
        app_dir = grunt.config('app_dir');

    var modRewrite = require('connect-modrewrite');

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-browser-sync');

    var core_folder = 'core';

    //  INCLUINDO API's
    build_config.core_files = {};
    build_config.core_files.js = [];

    // Adiciona as api's informadas
    if (build_config.core_api && build_config.core_api.length > 0) {

        var core_api_path = core_folder + '/api/';

        var apis = build_config.core_api;

        // adicionando api service
        var api_service_path = core_api_path + 'api.service.js';
        build_config.core_files.js.push(api_service_path);

        // incluir o caminho de cada api informada
        apis.forEach(function (api) {

            var api_path = core_api_path + api + '.api.js';
            build_config.core_files.js.push(api_path);

        });

    }

    // injetando core libs
    var core_libs = build_config.core_libs;
    var core_libs_path = path.join(core_folder, 'libs');
    if (core_libs instanceof Array) {
        core_libs.forEach(function (core_lib) {

            var this_folder = core_lib;

            if (core_lib.indexOf('/') >= 0) {
                this_folder = core_lib.split('/')[0];
                core_lib = core_lib.replace('/', '-');

                var core_lib_path = path.join(core_libs_path, this_folder, core_lib + '.js');
                build_config.core_files.js.push(core_lib_path);
            } else {
                var core_lib_path = path.join(core_libs_path, core_lib + '.js');
                build_config.core_files.js.push(core_lib_path);
            }


        });
    }

    // Separar libs de desenvolvimento e producao
    build_config.lib_files.jsDevelopment = build_config.lib_files.js.filter(function (lib) {
        return !!lib.development;
    }).map(function(lib) {
        return lib.development;
    });

    build_config.lib_files.jsProduction = build_config.lib_files.js.filter(function (lib) {
        return !!lib.production;
    }).map(function(lib) {
        return lib.production;
    });

    /**
     * Objeto de configurações que tem as instruções para cada plugin
     */
    var taskConfig = {

        pkg: grunt.file.readJSON('./package.json'),

        /**
         * Os diretorios a serem deletados quando 'grunt clean' é executado
         */
        clean: {
            options: {
                force: true
            },
            build: [
                '<%= build_dir %>'
            ],
            bin: [
                '<%= build_dir %>/bin'
            ]
        },

        html2js: {
            /**
             * Estes são os templates de `src/app`.
             */
            app: {
                options: {
                    base: '<%= app_dir %>',
                    rename: function (name) {
                        var filename = name.substr(name.lastIndexOf('/'));
                        return "templates" + filename;
                    }
                },
                src: ['<%= app_dir %>/<%= app_files.atpl %>', '!<%= app_dir %>/<%= app_files.html %>'],
                dest: '<%= build_dir %>/templates-app.js'
            }
        },

        jshint: {
            app: {
                src: ['<%= app_dir %>/**/*.js']
            },

            core: {
                src: [path.join(libs_directory, core_folder) + '/**/*.js']
            },

            options: {
                curly: true,
                immed: true,
                newcap: true,
                noarg: true,
                sub: true,
                boss: true,
                eqnull: true
            },
            globals: {}
        },

        concat: {

            build_sass: {
                src: [
                    '<%= app_dir %>/<%= app_files.sassVariables %>',
                    '<%= app_dir %>/<%= app_files.baseSass %>',
                    '<%= app_dir %>/<%= app_files.sass %>'
                ],
                dest: '<%= build_dir %>/bin/main.scss'
            },

            build_css: {

                src: [
                    '../<%= lib_files.css %>',
                    '<%= build_dir %>/bin/compiledSass.css'
                ],
                dest: '<%= build_dir %>/assets/style.css'

            },
            libs_min: {
                src: [
                    '!*.map',
                    '<%= build_dir %>/js/libs/jquery.min.js',
                    '<%= build_dir %>/js/libs/angular.min.js',
                    '<%= build_dir %>/js/libs/angular-translate.min.js',
                    '<%= build_dir %>/js/libs/*.js'
                ],
                dest: '<%= build_dir %>/js/min/libs.min.js'
            }
        },

        sass: {
            build: {
                options: {
                    noCache: true
                },
                files: {
                    '<%= build_dir %>/bin/compiledSass.css': '<%= build_dir %>/bin/main.scss'
                }
            }
        },

        copy: {

            // APP
            build_app_assets: {
                files: [
                    {
                        src: ['**','/bin/compiledSass.css.map'],
                        dest: '<%= build_dir %>/assets/',
                        cwd: '<%= app_dir %>/assets',
                        expand: true
                    }, {
                        src: ['compiledSass.css.map'],
                        dest: '<%= build_dir %>/assets/',
                        cwd: '<%= build_dir %>/bin/',
                        expand: true
                    }
                ]
            },
            build_appjs: {
                files: [
                    {
                        src: ['<%= app_files.js %>'],
                        dest: '<%= build_dir %>/js/app',
                        cwd: '<%= app_dir %>',
                        expand: true,
                        flatten: true

                    }
                ]
            },

            build_corejs: {
                files: [
                    {
                        src: ['<%= core_files.js %>'],
                        dest: '<%= build_dir %>/js/core/',
                        cwd: libs_directory,
                        expand: true,
                        flatten: true
                    }
                ]
            },

            // VENDORS

            build_vendorjs_development: {
                files: [
                    {
                        src: '<%= lib_files.jsDevelopment %>',
                        dest: '<%= build_dir %>/js/libs',
                        cwd: libs_directory,
                        expand: true,
                        flatten: true
                    }
                ]
            },

            build_vendorjs_production: {
                files: [
                    {
                        src: '<%= lib_files.jsProduction %>',
                        dest: '<%= build_dir %>/js/libs',
                        cwd: libs_directory,
                        expand: true,
                        flatten: true
                    }
                ]
            },

            build_maps_production: {
                files: [
                    {
                        src: '<%= lib_files.maps %>',
                        dest: '<%= build_dir %>/js/min',
                        cwd: libs_directory,
                        expand: true,
                        flatten: true
                    }
                ]
            },

            config_file: {
                files: [{
                    src: ['core/config.js'],
                    dest: '<%= build_dir %>/js/core/',
                    cwd: libs_directory,
                    expand: true,
                    flatten: true
                }]
            },

            build_vendor_testjs: {
                files: [
                    {
                        src: ['<%= test_files.js %>'],
                        dest: '<%= build_dir %>/',
                        cwd: libs_directory,
                        expand: true
                    }
                ]
            },

            build_vendorcss: {
                files: [
                    {
                        src: ['<%= lib_files.css %>'],
                        dest: '<%= build_dir %>/assets/',
                        cwd: libs_directory,
                        expand: true,
                        flatten: true
                    }
                ]
            },

            build_vendor_assets: {
                files: [
                    {
                        src: ['<%= lib_files.assets %>'],
                        dest: '<%= build_dir %>/assets/',
                        cwd: libs_directory,
                        expand: true,
                        flatten: true
                    }
                ]
            },

            build_vendor_fonts: {
                files: [
                    {
                        src: ['<%= lib_files.fonts %>'],
                        dest: '<%= build_dir %>/fonts',
                        cwd: libs_directory,
                        expand: true,
                        flatten: true,
                        filter: 'isFile'
                    }
                ]
            }
        },

        ngAnnotate: {
            options: {
                add: true,
                singleQuotes: true
            },

            app: {
                files: [{
                    expand: true,
                    src: ['js/app/*.js'],
                    dest: '<%= build_dir %>',
                    cwd: '<%= build_dir %>'
                }]
            },
            core: {
                files: [{
                    expand: true,
                    src: ['js/core/*.js'],
                    dest: '<%= build_dir %>',
                    cwd: '<%= build_dir %>'
                }]
            }
        },

        uglify: {
            app_files: {
                files: [{
                    src: ['<%= build_dir %>/js/app/*.module.js', '<%= build_dir %>/js/app/*.js'],
                    dest: '<%= build_dir %>/js/min/app.min.js'
                }]
            },
            core_files: {
                files: [{
                    src: [
                        '<%= build_dir %>/js/core/*.module.js',
                        '<%= build_dir %>/js/core/config.*.js',
                        '<%= build_dir %>/js/core/api.service.js',
                        '<%= build_dir %>/js/core/*.js'
                    ],
                    dest: '<%= build_dir %>/js/min/core.min.js'
                }]
            }
        },

        index: {

            test: {
                options: {
                    isTest: true
                },
                dir: '<%= build_dir %>/',
                cwd: '<%= build_dir %>',
                src: [
                    'js/min/libs.min.js',
                    'js/min/core.min.js',
                    'js/min/app.min.js',
                    'templates-app.js',
                    'assets/*.css'
                ]
            },

            development: {
                dir: '<%= build_dir %>/',
                cwd: '<%= build_dir %>',
                src: [
                    'js/libs/jquery.js',
                    'js/libs/angular.js',
                    'js/libs/angular-translate.js',
                    'js/libs/*.js',
                    'js/core/config.js',
                    'js/core/*.js',
                    'js/app/*.module.js',
                    'js/app/*.js',
                    'templates-app.js',
                    'assets/*.css'
                ]
            },

            production: {
                options: {
                    isProduction: true
                },
                dir: '<%= build_dir %>/',
                cwd: '<%= build_dir %>',
                src: [
                    'js/min/libs.min.js',
                    'js/min/core.min.js',
                    'js/min/app.min.js',
                    'templates-app.js',
                    'assets/*.css'
                ]
            }
        },

        delta: {

            options: {
                livereload: false,
                livereloadOnError: false,
                spawn: true
            },

            jssrc: {
                files: [
                    '<%= app_dir %>/**/*.js'
                ],
                tasks: ['newer:jshint:app', 'newer:copy:build_appjs', 'newer:ngAnnotate:app', 'notify:js']
            },

            jssrc_core: {
                files: [
                    libs_directory + '/core/**/*.js'
                ],
                tasks: ['newer:jshint:core', 'newer:copy:build_corejs', 'newer:ngAnnotate:core', 'notify:js']
            },

            assets: {
                files: [
                    '<%= app_dir %>/assets/**/*.*'
                ],
                tasks: ['copy:build_app_assets', 'copy:build_vendor_assets', 'notify:assets']
            },

            html: {
                files: ['<%= app_dir %>/<%= app_files.html %>'],
                tasks: ['index:development', 'notify:html']
            },

            tpls: {
                files: [
                    '<%= app_dir %>/<%= app_files.atpl %>'
                ],
                tasks: ['html2js', 'notify:tpl']
            },

            sass: {
                files: ['<%= app_dir %>/src/**/*.scss'],
                tasks: ['concat:build_sass', 'sass:build', 'concat:build_css', 'clean:bin', 'notify:sass']
            }

        },

        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        '<%= build_dir %>/assets/locales/**/*.json',
                        '<%= build_dir %>/assets/*.css',
                        '<%= build_dir %>/assets/style.css',
                        '<%= build_dir %>/**/*.js'
                    ]
                },
                options: {
                    open: false,
                    server: "../.bin",
                    watchTask: true,
                    middleware: [
                        modRewrite([
                            '^[^\\.]*$ /index.html [L]'
                        ])
                    ]
                }
            }
        },

        notify: {
            js: {
                options: {
                    duration: 0.5,
                    message: 'Grunt Watch terminou de compilar JS\'s modificados'
                }
            },
            assets: {
                options: {
                    duration: 0.5,
                    message: 'Grunt Watch compilou todos os ASSETS modificados'
                }
            },
            html: {
                options: {
                    duration: 0.5,
                    message: 'Grunt Watch compilou todos os HTMLs modificados'
                }
            },
            tpl: {
                options: {
                    duration: 0.5,
                    message: 'Grunt Watch compilou todos os TEMPLATES modificados'
                }
            },
            sass: {
                options: {
                    duration: 0.5,
                    message: 'Grunt Watch compilou todos os SASS modificados'
                }
            },
            watch: {
                options: {
                    duration: 0.5,
                    message: 'Build do sistema pronta e aguardando modificações'
                }
            }
        }

    };

    grunt.renameTask('watch', 'delta');
    grunt.registerTask('watch', ['build:development', 'browserSync', 'notify:watch', 'delta']);

    /**
     * The default task is to build and compile.
     */
    grunt.registerTask('default', ['build:development']);

    var build_production_tasks = [
        'clean:build',
        'html2js',
        'jshint:app',
        'jshint:core',
        'concat:build_sass',
        'sass:build',
        'concat:build_css',
        'copy:build_app_assets',
        'copy:build_vendor_assets',
        'copy:build_appjs',
        'copy:build_corejs',
        'copy:build_vendorjs_production',
        'copy:build_vendorcss',
        'copy:build_vendor_fonts',
        'copy:config_file',
        'copy:build_maps_production',
        'clean:bin',
        'concat:libs_min',
        'ngAnnotate:app',
        'ngAnnotate:core',
        'uglify:app_files',
        'uglify:core_files',
        'index:production'
    ];

    grunt.registerTask('build:production', build_production_tasks);

    grunt.registerTask('build:development', [
        'clean:build',
        'html2js',
        'jshint:app',
        'jshint:core',
        'concat:build_sass',
        'sass:build',
        'concat:build_css',
        'copy:build_app_assets',
        'copy:build_vendor_assets',
        'copy:build_appjs',
        'copy:build_corejs',
        'copy:build_vendorjs_development',
        'copy:build_vendorcss',
        'copy:build_vendor_fonts',
        'copy:config_file',
        'clean:bin',
        'ngAnnotate:app',
        'ngAnnotate:core',
        //'uglify:app_files',
        //'uglify:core_files',
        'index:development'
    ]);

    grunt.registerMultiTask('index', 'Process index.html template', function () {

        var build_dir = grunt.config('build_dir');
        var app_dir = grunt.config('app_dir');

        var options = this.options();

        var htaccess_file = app_dir + '/src/.htaccess';

        /**
         * A utility function to get all app JavaScript sources.
         */
        function filterForJS(files) {
            return files.filter(function (file) {
                return file.match(/\.js$/);
            });
        }

        /**
         * A utility function to get all app CSS sources.
         */
        function filterForCSS(files) {
            return files.filter(function (file) {
                return file.match(/\.css$/);
            });
        }

        var dirRE = new RegExp('^(' + build_dir + ')\/', 'g');
        var jsFiles = filterForJS(this.filesSrc).map(function (file) {
            return file.replace(dirRE, '');
        });

        var cssFiles = filterForCSS(this.filesSrc).map(function (file) {
            return file.replace(dirRE, '');
        });

        var dataToIndex = {
            html5Location: build_config.html5Location.development,
            scripts: jsFiles,
            styles: cssFiles,
            version: build_config.version
        };

        grunt.file.copy(app_dir + '/src/index.html', this.data.dir + '/index.html', {
            process: function (contents) {
                return grunt.template.process(contents, {
                    data: dataToIndex
                });
            }
        });

    });

    grunt.initConfig(grunt.util._.extend(taskConfig, build_config));

};