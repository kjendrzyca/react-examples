/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/

var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.js");

gulp.task('default', function () {
    // place code for your default task here
});

gulp.task("webpack", function (callback) {
    // run webpack
    webpack(webpackConfig, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});

var paths = {
    scripts: ["./js/*"]
};

// Rerun the task when a file changes
gulp.task('watch', function () {
    gulp.watch(paths.scripts, ['webpack']);
});