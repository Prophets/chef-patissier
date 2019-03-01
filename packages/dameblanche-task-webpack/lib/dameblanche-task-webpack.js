const config = require('dameblanche-core/lib/configLoader');
const taskConfig = config.getTaskConfig('webpack');
if (!taskConfig) throw new Error('config is required for webpack task');

const webpack = require('webpack');
const webpackConfig = require('./webpack-multi-config');
const logger = require('./webpackProductionBuildLogger');

const webpackProductionTask = (callback) => {
    const webpackConfigProduction = webpackConfig('production');

    webpack(webpackConfigProduction, (err, stats) => {
        logger(err, stats);
        callback();
    });
};

module.exports = webpackProductionTask;
