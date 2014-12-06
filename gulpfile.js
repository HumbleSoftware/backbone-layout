var connect = require('gulp-connect');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mochaPhantomJS = require('gulp-mocha-phantomjs');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var build = 'backbone-layout.min.js';
var src = [
  'backbone-layout.js',
];
var js = [
  '!./node_modules/**',
  '**/*.js'
];
var files = src.concat([
  'spec/**/*'
]);

gulp.task('connect', function () {
  connect.server({
    port: 8500,
    livereload: {
      port: 35710
    }
  });
});

gulp.task('test', ['jshint'], function () {
  return gulp
    .src('spec/index.html')
    .pipe(mochaPhantomJS());
});

gulp.task('jshint', function () {
  return gulp.src(js)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('reload', function () {
  gulp.src(files)
    .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(files, ['reload']);
});

gulp.task('build', ['test'], function () {
  gulp.src(src)
    .pipe(uglify())
    .pipe(rename(build))
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['test', 'connect', 'watch']);
