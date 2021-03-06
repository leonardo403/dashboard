'use strict';

//requires plugins
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');

//Task Browser Sync
gulp.task('browserSync', function() {
   	browserSync.init({
   	   server: {
   	   	 baseDir: '',
         index: 'index.html'
   	   },
   	})
});

//Task Sass 
gulp.task('sass', function() {
    return gulp.src('scss/style.scss')
      .pipe(sass()) //converte Sass para CSS
      .pipe(gulp.dest('css')) //envia para pasta css
      .pipe(browserSync.reload({
      	stream: true
      }))
});

//Task useref 
gulp.task('useref', function() {
    return gulp.src('*.html')
      .pipe(useref())
      //minifica somente JS
      .pipe(gulpIf('*.js', uglify()))
      //minifica somente CSS
      .pipe(gulpIf('css/style.css', cssnano()))
      //.pipe(gulp.dest('dist/'))
});

//Task Watch
gulp.task('watch', ['browserSync', 'sass'] , function() {
    gulp.watch('scss/*.scss', ['sass']);
    //Reload browser HTML e JS files
    gulp.watch('*.html', browserSync);
    gulp.watch('js/**/*.js', browserSync);
});