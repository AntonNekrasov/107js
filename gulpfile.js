/*globals require*/
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    jscs = require('gulp-jscs'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    minifycss = require('gulp-minify-css'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),

    del = require('del');

gulp.task('script', function() {
    return gulp.src([
        'mvc/107.js',
        /*view*/
        'mvc/js/view/domProcessor.js',
        'mvc/js/view/components/base/baseElement.js',
        'mvc/js/view/components/base/baseInput.js',
        'mvc/js/view/components/base/baseContainer.js',
        'mvc/js/view/components/base/baseControllable.js',
        'mvc/js/view/components/textInput.js',
        'mvc/js/view/components/hiddenInput.js',
        'mvc/js/view/components/textareaInput.js',
        'mvc/js/view/components/table.js',
        'mvc/js/view/components/button.js',
        'mvc/js/view/components/section.js',
        'mvc/js/view/view.js',
        'mvc/js/view/cardView.js',
        'mvc/js/view/formView.js',
        /*model*/
        'mvc/js/model/baseService.js',
        /*controller*/
        'mvc/js/controller/baseController.js'
    ])
    /*adding concatenation*/
    .pipe(concat('107.assembled.js'))
    .pipe(gulp.dest('dist/js/'))
    /*adding uglifying*/
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/js/'))
    .pipe(notify({ message: 'Script task complete' }));
});

gulp.task('style', function() {
    return gulp.src('mvc/css/107.css')
        .pipe(minifycss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css/'))
        .pipe(notify({ message: 'Style task complete' }));
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
    gulp.start('validate', 'script', 'style');
});

// Watch
gulp.task('watch', function() {
    gulp.watch('mvc/css/**/*.css', ['css']);
    gulp.watch('mvc/js/**/*.js', ['script']);
    livereload.listen();
});