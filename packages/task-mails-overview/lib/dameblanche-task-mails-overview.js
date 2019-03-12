const config = require('@dameblanche/core/lib/configLoader');

const taskConfig = config.getTaskConfig('mails-overview');
if (!taskConfig) throw new Error('config is required for mails-overview task');

const gulp = require('gulp');
const render = require('gulp-nunjucks-render');
const data = require('gulp-data');
const fs = require('fs');
const path = require('path');
const handleErrors = require('@dameblanche/core/lib/handleErrors');
const customNotifier = require('@dameblanche/core/lib/customNotifier');
const getFolders = require('@dameblanche/core/lib/getFolders');

const getData = () => {
    const dirs = getFolders(config.root.dest);

    let allData = {};
    allData.data = [];
    dirs.forEach((dir) => {
        const files = fs.readdirSync(path.join(config.root.dest, dir)).filter((file) => {
            return fs.statSync(path.join(config.root.dest, dir, file)).isFile();
        });

        allData.data.push({ 'dir': dir, 'files': files });
    });

    return allData;
};

const overviewTask = () => {
    const paths = {
        src: path.join(config.root.src, taskConfig.src, taskConfig.mainFile),
        dest: path.join(config.root.dest, taskConfig.dest),
    };

    return gulp.src(paths.src)
        .pipe(data(getData()))
        .on('error', handleErrors)
        .pipe(render({
            path: path.src,
            envOptions: {
                watch: false,
            },
        }))
        .on('error', handleErrors)
        .pipe(gulp.dest(config.root.dest))
        .on('error', handleErrors)
        .pipe(customNotifier({ title: 'Overview created.' }));
};

module.exports = overviewTask;
