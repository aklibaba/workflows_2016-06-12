var gulp = require('gulp'),
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    browserify = require('gulp-browserify'),
    connect = require('gulp-connect'),
    compass = require('gulp-compass');

// Separate declaration from assignment
var env,
    coffeeSources,
    jsSources,
    sassSources,
    htmlSources,
    jsonSources,
    outputDir,
    sassStyle;

// for env assign the NODE environemtn and if it is not set up assign development
var env = process.env.NODE_ENV || 'development';

gulp.task('test', function () {
  console.log(process.env.NODE_ENV);
});

// set up output depending on the environment variable that we have set up
if (env === 'development') {
  outputDir = 'builds/development/';
  sassStyle = 'expanded'; //might need to change something in scss files fro the sass command to run and overwrite the previous css filr
  } else {
  outputDir = 'builds/production/';
  sassStyle = 'compressed';
  }

var coffeeSources = ['components/coffee/*.coffee'];
var jsSources = ['components/scripts/**/*.js'];
var sassSources = ['components/sass/style.scss'];
var htmlSources = [outputDir + '**/*.html'];
var jsonSources = [outputDir + 'js/**/*.json'];

// process coffee scripts to javascript and store in components/scripts
gulp.task('coffee', function () {
  gulp.src(coffeeSources)
    .pipe(coffee({ bare: true })
      .on('error', gutil.log))
    .pipe(gulp.dest('components/scripts'));
  });

gulp.task('scripts', function () {
  gulp.src(jsSources)
    .pipe(concat('script.js'))
    .pipe(browserify()) //for loading jquery install npm jquery and in js file use $ = require('jquery'); without var for global
    .pipe(gulp.dest(outputDir + 'js')
    .on('error', gutil.log))
    .pipe(connect.reload()); //finish the task by reloading
});

gulp.task('sass', function () {
  gulp.src(sassSources)
    .pipe(compass({
      sass: 'components/sass',
      images: outputDir + 'images',
      style: sassStyle
    }))
    .pipe(gulp.dest( outputDir + 'css'))
    .pipe(connect.reload()); //finish the task by reloading
});



//run all tasks and then watch
gulp.task('default', ['coffee', 'scripts', 'sass', 'connect', 'html', 'json', 'watch']);

gulp.task('watch', function () {
  gulp.watch(coffeeSources, ['coffee']);
  gulp.watch(jsSources, ['scripts']);
  gulp.watch(['components/sass/**/*.scss'], ['sass']);
  gulp.watch(htmlSources, ['html']);
  gulp.watch(jsonSources, ['json']);
});


gulp.task('connect', function () {
  connect.server({
    root: outputDir, //use http://localhost:8080 to view site
    livereload: true //install livereload chrome exetnsion
  });
  });

//reload for html files
gulp.task('html', function () {
  gulp.src(htmlSources)
    .pipe(connect.reload());
});

//reload for json files
gulp.task('json', function () {
  gulp.src(jsonSources)
    .pipe(connect.reload());
});

// gulp.task('log', function () {
//   gutil.log('stuff happened', 'Really it did', gutil.colors.cyan(1));
// });