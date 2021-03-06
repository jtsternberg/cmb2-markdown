'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var buildBranch = require('gulp-build-branch');

gulp.task('sass', function () {
  return gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/**/*.scss', ['sass']);
});

gulp.task('js', function () {
  return gulp.src('src/**/*.js')
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(concat('cmb2-markdown.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./assets'));
});

gulp.task('js:watch', function () {
  gulp.watch('./src/**/*.js', ['js']);
});

gulp.task('watch', ['js', 'sass'],function () {
  gulp.watch('./src/**/*.js', ['js']);
  gulp.watch('./src/**/*.scss', ['sass']);
});

gulp.task('build', ['js', 'sass'], function (){
  gulp.src('assets/**/*')
    .pipe(gulp.dest('./build/assets'));

  gulp.src('./cmb2-markdown.php').pipe(gulp.dest('./build'));
  gulp.src('./index.php').pipe(gulp.dest('./build'));

  gulp.src('README.txt').pipe(gulp.dest('./build'));
  gulp.src('LICENSE.txt').pipe(gulp.dest('./build'));
});

gulp.task('default', ['watch']);
