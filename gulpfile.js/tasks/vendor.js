const {src, dest} = require('gulp'); 
const concat = require('gulp-concat');

const vendor = function (config) {
    return function () {
        return src(config.files.vendor)
        .pipe(concat('vendor.js'))
        .pipe(dest('./dist/js'))
        .pipe(dest(config.localServerProjectPath + 'js'));
    }
};

exports.vendor = vendor;
