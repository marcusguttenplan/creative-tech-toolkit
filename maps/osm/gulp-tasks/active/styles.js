var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create();

gulp.task('sass', function() {
    return gulp.src('app/css/scss/**/*.scss')
        .pipe(sass({
            "sourcemap=none": true // hack to allow auto-prefixer to work
        }))
        .pipe(autoprefixer('last 2 version'))
        .pipe(gulp.dest('public/css'))
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('vendorstyles', function() {
    return gulp.src('app/css/vendor/**')
        .pipe(gulp.dest('public/css/vendor'))
        .pipe(browserSync.reload({
            stream: true
        }));
});
