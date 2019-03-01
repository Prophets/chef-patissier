const config = require('dameblanche-core/lib/configLoader');
const taskConfig = config.getTaskConfig('templates');
if (!taskConfig) throw new Error('config is required for templates task');
const taskRequire = require('dameblanche-core/lib/taskRequire');

const browserSync = taskRequire('browsersync').browserSync;
const data = require('gulp-data');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const htmlmin = require('gulp-htmlmin');
const render = require('gulp-nunjucks-render');
const path = require('path');
const fs = require('fs');
const handleErrors = require('dameblanche-core/lib/handleErrors');
const customNotifier = require('dameblanche-core/lib/customNotifier');
const isProductionBuild = require('dameblanche-core/lib/isProductionBuild');

const templatesTask = () => {
    const exclude = path.normalize('!**/{' + taskConfig.excludeFolders.join(',') + '}/**');

    const paths = {
        src: [path.join(config.root.src, taskConfig.src, '/**/*.{' + taskConfig.extensions + '}'), exclude],
        dest: path.join(config.root.dest, taskConfig.dest)
    };

    const getData = () => {
        const dataPath = path.resolve(config.root.src, taskConfig.src, taskConfig.dataFile);
        return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    };

    return gulp.src(paths.src)
        .pipe(data(getData))
        .on('error', handleErrors)
        .pipe(render({
            path: [path.join(config.root.src, taskConfig.src)],
            envOptions: {
                watch: false
            },
            manageEnv(env) {
                env.addGlobal('imagePath', config.tasks.images ? config.tasks.images.dest : 'images');
            }
        }))
        .on('error', handleErrors)
        .pipe(gulpif(isProductionBuild(), htmlmin(taskConfig.htmlmin)))
        .pipe(gulp.dest(paths.dest))
        .on('end', browserSync.reload)
        .pipe(customNotifier({ title: 'Template compiled' }));
};

module.exports = templatesTask;
