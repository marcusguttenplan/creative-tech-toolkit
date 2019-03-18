var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    browserSync = require('browser-sync').create();

gulp.task('scripts', function() {
    return gulp.src(['!app/js/vendor/**', 'app/js/**/*.js'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('public/js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('vendorscripts', function() {
    return gulp.src('app/js/vendor/**/*.js')
        .pipe(gulp.dest('public/js/vendor'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
