const config = require('dameblanche-core/lib/configLoader');
const taskConfig = config.getTaskConfig('eslint');
if (!taskConfig) throw new Error('config is required for eslint task');

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const gulpif = require('gulp-if');
const path = require('path');
const isProductionBuild = require('dameblanche-core/lib/isProductionBuild');

const eslintTask = () => {
    const paths = {
        src: path.join(config.root.src, taskConfig.src, '/**/*.{' + taskConfig.extensions + '}')
    };

    return gulp.src([paths.src])
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        .pipe(gulpif(isProductionBuild(), eslint.failAfterError()));
};

module.exports = eslintTask;
