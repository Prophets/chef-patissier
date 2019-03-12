const gulp = require('gulp');
const getEnabledTasks = require('@dameblanche/core/lib/getEnabledTasks');
const isProductionBuild = require('@dameblanche/core/lib/isProductionBuild');
const watch = require('@dameblanche/task-watch');

const defaultTasks = [
    getEnabledTasks().enabledTasksAsOperations,
    isProductionBuild() ? undefined : watch,
].filter(Boolean);

module.exports = gulp.series(...defaultTasks);
