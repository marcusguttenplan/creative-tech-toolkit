var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    newer = require('gulp-newer'),
    pngcrush = require('imagemin-pngcrush'),
    pngquant = require('imagemin-pngquant'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache');

gulp.task('images', function() {
    return gulp.src('app/img/**/*')
        .pipe(newer('public/img'))
        .pipe(cache(imagemin([imagemin.gifsicle(), imagemin.jpegtran(), imagemin.optipng(), imagemin.svgo(), pngcrush(), pngquant()], {
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        })))
        .pipe(notify({
            message: 'Images Compressed'
        }))
        .pipe(gulp.dest('public/img'));
});
