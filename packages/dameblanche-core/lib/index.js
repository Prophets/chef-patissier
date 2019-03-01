require('dotenv').config();
const taskRequire = require('./taskRequire');

const bootstrap = (config) => {
    //Setup default config
    const defaultConfig = require('./defaultConfig');
    Object.assign(defaultConfig, config);

    // Get flat tasks list
    const { getFlatTasks } = require('./configLoader');

    // Setup all tasks
    const gulpTasks = {};

    getFlatTasks().forEach((task) => {
        const name = task[0];
        gulpTasks[name] = taskRequire(name)
    });

    gulpTasks.default = taskRequire('default');
    gulpTasks.watch = taskRequire('watch');

    return gulpTasks;
};

module.exports = bootstrap;

