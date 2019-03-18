var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    includeTasks = require('require-dir'),
    browserSync = require('browser-sync').create();

includeTasks('./gulp-tasks/active');

gulp.task('default', ['clean'], function() {
    gulp.start('watch')
});

// gulp.task('browserSync', function() {
//     browserSync.init({
//         server: {
//             baseDir: 'public'
//         },
//         logConnections: true
//     })
// });

gulp.task('browserSync', function() {
    browserSync.init({
        // server: {
        //     baseDir: 'public'
        // },
        files: "public/**/*",
        proxy: "localhost:3000",
	    port: 5000,
        logConnections: true
    })
});

gulp.task('clean', function() {
    return del(['public/css', 'public/js', 'public/**/*.html', 'public/fonts']);
});

gulp.task('watch', ['browserSync', 'clean', 'sass', 'vendorstyles', 'scripts', 'vendorscripts', 'copyHtml', 'fonts'], function() {
    gulp.watch('app/**/*.html', ['copyHtml']);
    gulp.watch('app/css/**/*.scss', ['sass'], browserSync.reload);
    gulp.watch('app/css/vendor/**', ['vendorstyles']);
    gulp.watch('app/js/**/*.js', ['scripts']);
    gulp.watch('app/js/vendor/**', ['vendorscripts']);
    // gulp.watch('app/img/**/*', ['images']);
    livereload.listen();
    gulp.watch(['app/**']).on('change', livereload.changed);
});
