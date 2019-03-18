var gulp = require('gulp'),
    del = require('del'),
    browserSync = require('browser-sync').create();

gulp.task('cleanhtml', function() {
    return del('public/**/*.html')
});

gulp.task('copyHtml', function() {
    gulp.src('app/**/*.html').pipe(gulp.dest('public')).pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('public/fonts'));
});
