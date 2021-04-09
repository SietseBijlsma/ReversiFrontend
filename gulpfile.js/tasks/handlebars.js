const {src, dest} = require('gulp'); 
const handlebars = require('gulp-handlebars');
const wrap = require('gulp-wrap');
const declare = require('gulp-declare');
const concat = require('gulp-concat');
const merge = require('merge-stream');

const handlebarsGulp = function (config) {
    const templates = src(config.files.handlebars)
            .pipe(handlebars())
            .pipe(wrap('Handlebars.template(<%= contents %>)'))
            .pipe(declare({
                namespace: 'spa_templates',
                noRedeclare: true, 
                processName: function(filePath) {
                    return declare.processNameByPath(filePath.replace('<parent_map>/templates/', '')); 
                }
            }));

    const partials = src(config.files.partials)
        .pipe(handlebars())
        .pipe(wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
            imports: {
                processPartialName: function (fileName) {
                    return JSON.stringify(path.basename(fileName, '.js').substr(1));
                }
            }
        }));

        const result = merge(partials, templates)
            .pipe(concat('templates.js'))
            .pipe(dest('dist/js/'))
            .pipe(dest(config.localServerProjectPath + 'js'))
    return function () {
        return result;
    };
            
};

exports.handlebarsGulp = handlebarsGulp;