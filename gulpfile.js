var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass');

var sassSources = ['components/sass/style.scss'];
var coffeeSources = ['components/coffee/*.coffee'];

gulp.task('coffee', function () {
  gulp.src(coffeeSources)
    .pipe(coffee({ bare: true })
      .on('error', gutil.log))
    .pipe(gulp.dest('components/scripts'));
  });

gulp.task('scripts', function () {
  gulp.src('components/scripts/**/*.js')
    .pipe(concat('script.js'))
    .pipe(browserify())
    .pipe(gulp.dest('builds/development/js')
        .on('error', gutil.log));
});

gulp.task('sass', function () {
  gulp.src(sassSources)
    .pipe(compass({
      sass: 'components/sass',
      images: 'builds/development/images',
      style: 'expanded'
    }))
    .pipe(gulp.dest( 'builds/development/css'));
});


gulp.task('default', ['coffee', 'scripts', 'sass']);


// gulp.task('log', function () {
//   gutil.log('stuff happened', 'Really it did', gutil.colors.cyan(1));
// });