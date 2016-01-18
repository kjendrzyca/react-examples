'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            crud: {
                src: ['./crud/crud.jsx'],
                dest: './crud/crud.bundle.js',
                options: {
                    transform: ['reactify'],
                    extensions: ['.jsx']
                }
            },
            todo: {
                src: ['./todo/todo.jsx'],
                dest: './todo/todo.bundle.js',
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
            },
            todo: {
                files: ['todo/*.jsx'],
                tasks: ['browserify:todo']
            }
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['watch']);
};