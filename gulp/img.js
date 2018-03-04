// ------------------
// image optimization
// ------------------
var gulp  = require('gulp'),
    image = require('gulp-image');

gulp.task('img', function() {
  return gulp
    .src('src/img/*.*')
    .pipe(image())
    .pipe(gulp.dest('dist/img/'))
});
