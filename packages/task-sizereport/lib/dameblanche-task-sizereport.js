const config = require('@dameblanche/core/lib/configLoader');
const taskConfig = config.getTaskConfig('sizereport');
if (!taskConfig) throw new Error('config is required for sizereport task');

const gulp = require('gulp');
const sizereport = require('gulp-sizereport');

const sizeReportTask = () => {
    const ignoreThese = taskConfig.ignore.map((i) => `!${ config.root.dest }/${ i }`);

    return gulp.src([
        config.root.dest + '/**/*',
        `!${ config.root.dest }/rev-manifest.json`,
        ...ignoreThese,
    ]).pipe(sizereport({
        gzip: true,
    }));
};

module.exports = sizeReportTask;
