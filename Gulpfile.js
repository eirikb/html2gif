var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var mustache = require('gulp-mustache');
var connect = require('gulp-connect');
var fs = require('fs');

var workerSrc = [
  'src/trix.js',
  'bower_components/gif.js/src/NeuQuant.js',
  'bower_components/gif.js/src/LZWEncoder.js',
  'bower_components/gif.js/src/GIFEncoder.js',
  'src/worker.js'
];

var combineSrc = ['bower_components/html2canvas/build/html2canvas.js', 'dist/html2gif.js'];

gulp.task('worker', function() {
  return gulp.src(workerSrc)
    .pipe(concat('worker.js'))
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('html2gif', ['worker'], function() {
  return gulp.src('template/html2gif.mustache')
    .pipe(mustache({
      workerSrc: JSON.stringify(fs.readFileSync('dist/worker.js').toString()),
      html2gifSrc: fs.readFileSync('src/html2gif.js').toString()
    }, { extension: '.js' }))
    .pipe(gulp.dest("./dist"));
});

gulp.task('combine', function() {
  return gulp.src(combineSrc)
    .pipe(concat('html2gif.min.js'))
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('dev', function() {
  gulp.start('default');
  gulp.watch('*.js', ['default']);
  connect.server();
});

gulp.task('default', ['worker', 'html2gif', 'combine']);
