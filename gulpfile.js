/*globals require*/
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    jscs = require('gulp-jscs'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    //minifycss = require('gulp-minify-css'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),

    del = require('del');

gulp.task('script', function() {
    return gulp.src([
        'mvc/107.js',
        /*view*/
        'mvc/view/domProcessor.js',
        'mvc/view/baseElement.js',
        'mvc/view/components/base/baseInput.js',
        'mvc/view/components/textInput.js',
        'mvc/view/components/hiddenInput.js',
        'mvc/view/components/textareaInput.js',
        'mvc/view/components/base/baseSection.js',
        'mvc/view/components/button.js',
        'mvc/view/baseView.js',
        'mvc/view/formView.js',
        /*model*/
        'mvc/model/baseService.js'
        /*controller*/
        ])
        /*adding concatenation*/
        .pipe(concat('107.assembled.js'))
        .pipe(gulp.dest('dist/js/'))
        /*adding uglifying*/
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/js/'))
        .pipe(notify({ message: 'script task complete' }));
});

gulp.task('validate', function () {
    return gulp.src('mvc/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(jscs('jscsrc'));
});

gulp.task('clean', function(cb) {
    del(['dist/'], cb)
});

gulp.task('default', ['clean'], function() {
    gulp.start('validate', 'script');
});

// Watch
gulp.task('watch', function() {

    //gulp.watch('style/*.css', ['style']);
    gulp.watch('mvc/**/*.js', ['script']);
    livereload.listen();

});