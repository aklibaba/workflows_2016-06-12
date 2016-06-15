var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    connect = require('gulp-connect'),
    compass = require('gulp-compass');

var coffeeSources = ['components/coffee/*.coffee'];
var jsSources = ['components/scripts/**/*.js'];
var sassSources = ['components/sass/style.scss'];

gulp.task('coffee', function () {
  gulp.src(coffeeSources)
    .pipe(coffee({ bare: true })
      .on('error', gutil.log))
    .pipe(gulp.dest('components/scripts'));
  });

gulp.task('scripts', function () {
  gulp.src(jsSources)
    .pipe(concat('script.js'))
    .pipe(browserify())
    .pipe(gulp.dest('builds/development/js')
        .on('error', gutil.log))
    .pipe(connect.reload());
});

gulp.task('sass', function () {
  gulp.src(sassSources)
    .pipe(compass({
      sass: 'components/sass',
      images: 'builds/development/images',
      style: 'expanded'
    }))
    .pipe(gulp.dest( 'builds/development/css'))
    .pipe(connect.reload());
});


gulp.task('default', ['coffee', 'scripts', 'sass', 'connect', 'watch']);

gulp.task('watch', function () {
  gulp.watch(coffeeSources, ['coffee']);
  gulp.watch(jsSources, ['scripts']);
  gulp.watch(['components/sass/**/*.scss'], ['sass']);
});


gulp.task('connect', function () {
  connect.server({
    root: 'builds/development',
    livereload: true
  });
  });


// gulp.task('log', function () {
//   gutil.log('stuff happened', 'Really it did', gutil.colors.cyan(1));
// });