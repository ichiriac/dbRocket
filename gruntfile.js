module.exports = function(grunt) {
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            js: {
                files: [
                    './public/assets/js/*.js',
                    './components/**/*.js'
                ],
                tasks: ['concat:front'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: ['./public/views/**'],
                options: {
                    livereload: true,
                },
            },
            css: {
                files: ['./public/assets/**/*.css'],
                tasks: ['concat_css'],
                options: {
                    livereload: true
                }
            }
        },
        jshint: {
            all: ['gruntfile.js', './public/assets/js/*.js', './app/**/*.js']
        },
        less: {
            all: {
                options: {
                  paths: [
                    './public/assets/css/',
                    './public/components/bootstrap/less/'
                  ]
                },
                files: {
                  './public/bootstrap.css': './public/components/bootstrap/less/bootstrap.less',
                  './public/app.css': './public/assets/**/*.less'
                }
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            front: {
                src: [
                    './public/components/jquery/dist/jquery.js',
                    './public/components/bootstrap/dist/js/bootstrap.js',
                    './public/components/angular/angular.js',
                    './public/components/angular-bootstrap/ui-bootstrap.js',
                    './public/components/angular-cookies/angular-cookies.js',
                    './public/components/angular-resource/angular-resource.js',
                    './public/components/angular-ui-utils/ui-utils.js',
                    './public/assets/js/*.js'
                ],
                dest: './public/front.js'
            }
        },
        concat_css: {
          files: {
            './public/style.css': './public/assets/**/*.css',
            './public/front.css': [
              './public/bootstrap.css',
              './public/app.css',
              './public/style.css'
            ]
          }
        },
        uglify: {
            options: {
                mangle: false  // Use if you want the names of your functions and variables unchanged
            },
            front: {
                files: {
                    './public/front.js': './public/front.js'
                }
            }
        },
        nodemon: {
            developpement: {
                script: 'app.js',
                options: {
                    ignore: ['README.md', 'node_modules/**', '.DS_Store'],
                    ext: 'js',
                    watch: ['app', 'config'],
                    delayTime: 1,
                    env: {
                        PORT: 3000
                    },
                    cwd: __dirname
                }
            }
        },
        concurrent: {
            tasks: ['nodemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    });

    // Load NPM tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-env');

    // Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    // Default task(s).
    grunt.registerTask('default', ['concurrent']);

    // Install tasks
    grunt.registerTask(
        'install:developpement', ['jshint','concat:front', 'less:all', 'concat_css']
    );
    grunt.registerTask(
        'install:production', ['concat:front', 'less:all', 'concat_css','uglify:front']
    );

};