var gulp = require('gulp');
var gib = require('gib');
var connect = require('gib/node_modules/gulp-connect');
var mochaPhantomJS = require('gulp-mocha-phantomjs');

// Gibberish:
var config = {
  build: '.',
  js: {
    'backbone-layout.min.js': {
      src: './backbone-layout.js',
      jshint: true
    },
    'spec': {
      src: 'spec/**/*.js',
      jshint: true
    }
  },
  server: {
    livereload: {
      port: 35710
    },
    port: 8500
  }
};
gib.gulpfile(config, gulp);

gulp.task('test', ['jshint'], function () {
  return gulp
    .src('spec/index.html')
    .pipe(mochaPhantomJS());
});
gulp.task('reload', function () {
  gulp.src('spec/**/*').pipe(connect.reload());
});
gulp.task('watch', function () {
  gulp.watch('spec/**/*', ['test']);
  gulp.watch('backbone-layout.js', ['test']);
});
gulp.task('jshint', ['js-backbone-layout.min.js-hint', 'js-spec-hint']);
gulp.task('build', ['test', 'js-backbone-layout.min.js-compile']);
gulp.task('compile', ['build']);
gulp.task('default', ['test', 'server', 'watch']);
