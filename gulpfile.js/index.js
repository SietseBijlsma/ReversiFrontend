const { parallel } = require("gulp");
const { src } = require("vinyl-fs");
const { Script } = require("vm");
const config = require('./config');
const vendor = require('./tasks/vendor').vendor(config);
const js = require('./tasks/js').js(config);
const sass = require('./tasks/sass').sass(config.localServerProjectPath, config.files.sass);
sass.displayName = 'sass'; 
const handlebarsGulp = require('./tasks/handlebars').handlebarsGulp(config);
const sasswatch = require('./tasks/watch').watchFiles(sass);

const hello = function (done) {
    js();
    sass();
    sasswatch();
    vendor();
    handlebarsGulp();

    done();
}

exports.js = js;
exports.default = hello;