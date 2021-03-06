
'use strict';

const Gulp = require('gulp');
const Sass = require('gulp-sass');
const Concat = require('gulp-concat');
const BrowserSync = require('browser-sync');
const childProcess = require('child_process');


Gulp.task('default', ['dev']);

Gulp.task('dev', ['redis-server','express', 'browser-sync', 'sass', 'sass:watch']);

//Redis-Server
Gulp.task('redis-server', function() {
  childProcess.exec('redis-server', function(err, stdout, stderr) {
    console.log(stdout);
    if (err !== null) {
      console.log('exec error: ' + err);
    }
  });
});

// Browser-Sync
Gulp.task('browser-sync', _ => {
  BrowserSync.init({
    proxy: `localhost:8080/login`
  });
});

// Express server
Gulp.task('express', _ => {
  let options = { shell: true, stdio: "inherit" };
  return childProcess.spawn('nodemon', ['server.js'], options);
});

// SASS
Gulp.task('sass', _ => {
  return Gulp.src('./sass/styles.scss')
    .pipe(Sass().on('error', Sass.logError))
    .pipe(Concat('styles.css'))
    .pipe(Gulp.dest('./public/css'))
    .pipe(BrowserSync.stream())
  ;
});

Gulp.task('sass:watch', _ => {
  Gulp.watch('./sass/styles.scss', ['sass']);
});