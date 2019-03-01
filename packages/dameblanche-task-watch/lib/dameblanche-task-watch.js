const config = require('dameblanche-core/lib/configLoader');

const gulp = require('gulp');
const path = require('path');
const getEnabledTasks = require('dameblanche-core/lib/getEnabledTasks');
const taskRequire = require('dameblanche-core/lib/taskRequire');
const browserSync = taskRequire('browsersync');

const watchFiles = () => {
    const tasks = getEnabledTasks().enabledTasksAsStrings;
    tasks.forEach((taskName) => {
        if (taskName !== 'clean') {
            const task = config.getTaskConfig(taskName);
            if (!task.disableWatch) {
                const glob = path.join(config.root.src, task.src, '**/*.{' + task.extensions.join(',') + '}');
                gulp.watch(glob, { usePolling: true }, taskRequire(taskName));
            }
        }
    });
};

module.exports = gulp.series(
    browserSync,
    watchFiles
);
