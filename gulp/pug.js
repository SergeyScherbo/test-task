// ---------------
// pug compilation
// ---------------
var gulp = require('gulp'),
    pug  = require('gulp-pug');

gulp.task('pug', function() {
  return gulp
    .src('src/pug/pages/*.pug')
    .pipe(pug({ pretty: true }))
    .on('error', function(err) {
      console.log(err.message);
      this.end();
    })
    .pipe(gulp.dest('dist/'));
});

gulp.task('pug:watch', function() {
  gulp.watch('src/pug/**/*.pug', ['pug']);
});
