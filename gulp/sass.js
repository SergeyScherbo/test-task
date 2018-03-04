// ------------------
// styles compilation
// ------------------
var gulp         = require('gulp'),
    config       = require('../package.json').config;

    sass         = require('gulp-sass'),
    sourceMaps   = require('gulp-sourcemaps'),
    autoPrefixer = require('gulp-autoprefixer'),

gulp.task('styles', function() {
  return gulp
    .src(config.src.styles + '/**/*.*')
    .pipe(sourceMaps.init())
    .pipe(sass({ outputStyle: 'compressed' }))
    .on('error', function(err) {
      console.log(err.message);
      this.end();
    })
    .pipe(autoPrefixer())
    .pipe(sourceMaps.write())
    .pipe(gulp.dest(config.dist.css));
});

gulp.task('styles:watch', function() {
  gulp.watch(config.src.styles + '/**/*.*', ['styles']);
});
