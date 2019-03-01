const config = require('dameblanche-core/lib/configLoader');
const taskConfig = config.getTaskConfig('stylelint');
if (!taskConfig) throw new Error('config is required for stylelint task');

const gulp = require('gulp');
const stylelint = require('gulp-stylelint');
const path = require('path');
const isProductionBuild = require('dameblanche-core/lib/isProductionBuild');

const stylelintTask = () => {
    const paths = {
        src: path.join(config.root.src, taskConfig.src, '/**/*.{' + taskConfig.extensions + '}')
    };

    return gulp.src([paths.src])
        .pipe(stylelint({
            failAfterError: isProductionBuild() ? true : false,
            reporters: [{
                formatter: 'string',
                console: true
            }]
        }));
};

module.exports = stylelintTask;
