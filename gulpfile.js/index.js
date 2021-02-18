const { src } = require("vinyl-fs");
const { Script } = require("vm");

const config = require('./config');
const js = require('./tasks/js').js(config);
const hello = function (done) {
    console.log(`Groeten van Gulp!`)
    done();
}

exports.js = js;
exports.default = hello;