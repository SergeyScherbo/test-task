/*
  copy fonts, images and other stuff
  this copy:img task wont optimize your images, so use this only for development
*/

var gulp  = require('gulp')

gulp.task('img:copy', function() {
  return gulp
    .src('src/img/*.*')
    .pipe(gulp.dest('dist/img/'))
});

gulp.task('img:watch', function() {
  gulp.watch('src/img/*.*', ['copy:img']);
});

gulp.task('fonts:copy', function() {
  return gulp
    .src('src/fonts/*.*')
    .pipe(gulp.dest('dist/fonts/'))
});

gulp.task('fonts:watch', function() {
  gulp.watch('src/fonts/*.*', ['copy:fonts']);
});

// use this if you need html
gulp.task('html:copy', function() {
  return gulp
    .src('src/*.html')
    .pipe(gulp.dest('dist/'))
});

gulp.task('html:watch', function() {
  gulp.watch('src/*.html', ['html:copy']);
});

gulp.task('copy', ['img:copy', 'fonts:copy', 'html:copy']);
