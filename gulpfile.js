var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat');

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
    .pipe(gulp.dest('builds/development/js')
        .on('error', gutil.log));
});

// gulp.task('log', function () {
//   gutil.log('stuff happened', 'Really it did', gutil.colors.cyan(1));
// });