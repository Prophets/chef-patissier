const fs = require('fs');
const path = require('path');
const defaultsDeep = require('lodash/defaultsDeep');
const flatMap = require('lodash/flatMap');
const taskEnabled = require('./taskEnabled');

const configLoader = (taskName) => {
    if (taskEnabled(taskName)) {
        try {
            const config = require(`${process.cwd()}/node_modules/chef-patissier-task-${taskName}/lib/config`);
            return config;
        } catch (e) {
            return {};
        }
    }
    throw new Error(`Can't get config for chef-patissier-task-${taskName}: npm dependency missing`)
};

const config = require('./defaultConfig');

const getFlatTasks = () => {
    return flatMap(config.tasks, (parallelTasks) => {
        return parallelTasks.map(task => {
            if (Array.isArray(task)) {
                return task;
            }
            return [task, {}];
        });
    });
};

const getTaskConfig = (taskName) => {
    const task = getFlatTasks().find((task) => task[0] === taskName);
    return defaultsDeep(task && task[1], configLoader(taskName));
}

const getConfig = (configName) => {
    return defaultsDeep(config[configName], configLoader(configName));
}

module.exports = config;
module.exports.getFlatTasks = getFlatTasks;
module.exports.getTaskConfig = getTaskConfig;
module.exports.getConfig = getConfig;
