/*globals require*/
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    //minifycss = require('gulp-minify-css'),
    notify = require('gulp-notify'),
    //livereload = require('gulp-livereload'),
    del = require('del');

gulp.task('script', function() {
    return gulp.src([
        "mvc/107.js",
        /*view*/
        "mvc/view/nodeConstructor.js",
        "mvc/view/baseElement",
        /*model*/
        "mvc/model/baseService.js"
        /*controller*/
        ])
        /* adding jshint task*/
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        /*adding concatenation*/
        .pipe(concat('107.assembled.js'))
        .pipe(gulp.dest('dist/js/'))
        /*adding uglifying*/
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/js/'))
        .pipe(notify({ message: 'script task complete' }));
});

gulp.task('clean', function(cb) {
    del(['dist/'], cb)
});

gulp.task('default', ['clean'], function() {
    gulp.start('script');
});