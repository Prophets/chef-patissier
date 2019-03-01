const config = require('dameblanche-core/lib/configLoader');
const taskConfig = config.getTaskConfig('static');
if (!taskConfig) throw new Error('config is required for static task');

const changed = require('gulp-changed');
const gulp = require('gulp');
const path = require('path');
const customNotifier = require('dameblanche-core/lib/customNotifier');

const staticTask = () => {
    const paths = {
        src: [
            path.join(config.root.src, taskConfig.src, '/**/*'),
            path.join('!' + config.root.src, taskConfig.src, '/README.md')
        ],
        dest: path.join(config.root.dest, taskConfig.dest)
    };

    return gulp.src(paths.src)
        .pipe(changed(paths.dest)) // Ignore unchanged files
        .pipe(gulp.dest(paths.dest))
        .pipe(customNotifier({ title: 'Static files copied' }));
};

module.exports = staticTask;
