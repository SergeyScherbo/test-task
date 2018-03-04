var gulp        = require('gulp'),
    runSequence = require('run-sequence');

gulp.task('default', function() {
  runSequence(
    'clean',
    ['styles', 'javascript:main', 'copy', 'svg-sprite'],
    'serve',
    'watch'
  )
});

gulp.task('build', function() {
  runSequence(
    'clean',
    ['styles', 'javascript', 'img', 'svg-sprite', 'copy']
  )
});
