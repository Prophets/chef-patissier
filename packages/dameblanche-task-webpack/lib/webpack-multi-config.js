const config = require('dameblanche-core/lib/configLoader');
const taskConfig = config.getTaskConfig('webpack');
if (!taskConfig) throw new Error('config is required for webpack task');

const path = require('path');
const webpack = require('webpack');
const WebpackManifest = require('./webpackManifest');
const pathToUrl = require('dameblanche-core/lib/pathToUrl');

module.exports = (env) => {
    const jsSrc = path.resolve(config.root.src, taskConfig.src);
    const jsDest = path.resolve(config.root.dest, taskConfig.dest);
    const publicPath = pathToUrl(taskConfig.dest, '/');
    const rev = (env === 'production');
    const filenamePattern = rev ? '[name]-[chunkhash].js' : '[name].js';

    const webpackConfig = {
        context: jsSrc,
        plugins: [],
        resolve: {
            modules: [
                jsSrc,
                'node_modules',
            ],
            extensions: taskConfig.extensions.map((extension) => '.' + extension),
        },
        module: {
            rules: [{
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            }],
        },
        mode: 'development',
        output: {
            path: path.normalize(jsDest),
            filename: filenamePattern,
            publicPath: publicPath,
        },
    };

    if (env === 'development') {
        webpackConfig.devtool = 'inline-source-map';

        // Create new entries object with webpack-hot-middleware added
        for (let key in taskConfig.entries) {
            if (Object.prototype.hasOwnProperty.call(taskConfig.entries, key)) {
                const entry = taskConfig.entries[key];
                taskConfig.entries[key] = ['webpack-hot-middleware/client?&reload=true'].concat(entry);
            }
        }

        webpackConfig.plugins.push(
            new webpack.HotModuleReplacementPlugin()
        );
    }

    webpackConfig.entry = taskConfig.entries;

    if (env === 'production') {
        webpackConfig.mode = 'production';

        if (rev) {
            webpackConfig.plugins.push(new WebpackManifest(publicPath, config.root.dest));
        }
    }

    return webpackConfig;
};
