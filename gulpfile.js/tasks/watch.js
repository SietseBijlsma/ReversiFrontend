// const series = require('gulp-series');
//const watch = require('gulp-watch');
const gulp = require('gulp');
const watch = require('gulp-watch');
const watchFiles = (sass) => {
    return function () {
        return gulp.watch(['./css/*.scss', './**/*.scss'], gulp.series(sass));
    }
 };  

 exports.watchFiles = watchFiles;
