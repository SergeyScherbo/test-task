// ----------
// svg sprite
// ----------
var gulp         = require('gulp'),
    cheerio      = require('gulp-cheerio'),
    replace      = require('gulp-replace'),
    svgSprite    = require('gulp-svg-sprite'),
    svgMin       = require('gulp-svgmin');

gulp.task('svg-sprite', function() {
  return gulp.src('src/icon/*.svg')
             .pipe(svgMin({
               js2svg: {
                 pretty: true
               }
             }))
             .pipe(cheerio({
               run: function(callback) {
                 callback('[fill]').removeAttr('fill');
                 callback('[stroke]').removeAttr('stroke');
                 callback('[style]').removeAttr('style');
               },
               parserOptions: { xmlMode: true }
             }))
             .pipe(replace('&gt;', '>'))
             .pipe(svgSprite({
               mode: {
                 symbol: {
                   sprite: '../sprite.svg',
                   render: {
                     scss: {
                       dest: '../../../src/styles/_sprite-svg.scss',
                       template: 'gulp/svg-sprite/sprite-template.scss'
                     }
                   }
                 }
               }
             }))
             .pipe(gulp.dest('dist/img/'));
});

gulp.task('svg-sprite:watch', function() {
  gulp.watch('src/icon/*.svg', ['svg-sprite']);
});
