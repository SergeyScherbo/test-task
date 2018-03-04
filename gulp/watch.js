var gulp = require('gulp');

gulp.task('watch', [
  'html:watch',
  'styles:watch',
  'javascript:watch',
  'img:watch',
  'svg-sprite:watch',
  'fonts:watch'
]);
