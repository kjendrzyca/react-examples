'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // mochaTest: {
        //     test: {
        //         options: {
        //             reporter: 'spec'
        //         },
        //         src: ['./tests/*.spec.js']
        //     }
        // },
        browserify: {
            crud: {
                src: ['./crud/crud.jsx'],
                dest: './crud/crud.js',
                options: {
                    transform: ['reactify'],
                    extensions: ['.jsx']
                }
            }
        },
        watch: {
            browserify: {
                files: ['crud/*.jsx'],
                tasks: ['browserify:crud']
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['watch']);
};