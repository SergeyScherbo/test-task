// ------
// server
// ------
var gulp        = require('gulp'),
    browserSync = require('browser-sync').create();

gulp.task('serve', function() {
  browserSync.init({
    server: 'dist/',
    files: [
      'dist/*.html',
      'dist/css/*.css',
      'dist/js/*.js',
      'dist/img/*.*',
      'dist/icon/*.*',
      'dist/fonts/*.*'
    ]
  });
});
