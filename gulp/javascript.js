var gulp  = require('gulp'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename');

gulp.task('javascript:libs', function() {
  // return gulp
  //   .src([
  //     './node_modules/animejs/anime.min.js',
  //     './node_modules/rellax/rellax.min.js'
  //   ])
  //   .pipe(concat('vendor.js'))
  //   .pipe(gulp.dest('dist/js'));
});

gulp.task('javascript:main', function() {
  return gulp
    .src('src/js/*.js')
    .pipe(babel())
    .on('error', function(err) {
      console.log(err.message);
      this.end();
    })
    .pipe(gulp.dest('dist/js'));
});

gulp.task('javascript', ['javascript:libs', 'javascript:main'], function() {
  return gulp
    .src([
      './dist/js/vendor.js',
      './dist/js/app.js'
    ])
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('dist/js'))
});

gulp.task('javascript:watch', function() {
  gulp.watch('src/js/*.js', ['javascript:main']);
});
