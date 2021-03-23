const {src, dest} = require('gulp'); 
const order = require('gulp-order');
const concat = require('gulp-concat');
//const uglify = require('gulp-uglifyjs');
//const babel = require('gulp-babel');
const fn = function (config) {
    return function () {
        return src(config.files.js)
        .pipe(order(config.filesJsOrder, {base: './'}))
        .pipe(concat('app.js'))
        // .pipe(babel({
        // presets: ['@babel/preset-env']
        // })) 
        // .pipe(uglify({compress: true})) 
        .pipe(dest('./dist/js'))
        .pipe(dest(config.localServerProjectPath + 'js'))
        // .pipe(dest(config.localServerProjectPath + 'uglified'))
    }
};

exports.js = fn;