var gulp = require('gulp')
  , runSequence = require('run-sequence')
  , fs = require('fs')
  , jshint = require('gulp-jshint')
  , uglifyjs = require('gulp-uglify')
  , mocha = require('gulp-mocha')
  , header = require('gulp-header')
  , pkg = require('./package.json');

gulp.task('lint', function() {
  return gulp.src(['./src/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('uglify', function() {
  return gulp.src('src/translitbg.js')
    .pipe(uglifyjs())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('dist', ['uglify'], function() {
  return gulp.src('./dist/translitbg.js')
    .pipe(header(fs.readFileSync('./src/header.txt', 'utf8'), { pkg : pkg } ))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('test', ['lint'], function() {
  return gulp.src('test/*.js', {read: false})
    .pipe(mocha());
});

// -- Default
gulp.task('default', function(cb) {
  runSequence('test', 'dist', cb);
});
