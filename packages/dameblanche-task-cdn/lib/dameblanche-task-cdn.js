const config = require('dameblanche-core/lib/configLoader');

const taskConfig = config.getTaskConfig('cdn');
if (!taskConfig) throw new Error('config is required for cdn task');

const gulp = require('gulp');
const ftp = require('vinyl-ftp');
const path = require('path');
const customNotifier = require('dameblanche-core/lib/customNotifier');
const isProductionBuild = require('dameblanche-core/lib/isProductionBuild');

const uploadTask = () => {
    if (!isProductionBuild()) {
        return undefined;
    }

    const connection = ftp.create({
        host: taskConfig.cdn.host,
        user: taskConfig.cdn.user,
        password: taskConfig.cdn.password,
        port: taskConfig.cdn.port,
        log: customNotifier,
    });

    const excludeExtensions = path.normalize('!**/*.{' + taskConfig.excludeExtensions.join(',') + '}');
    const excludeFolder = path.normalize('!**/css');

    const paths = {
        src: [path.join(config.root.dest, '/**/*'), excludeFolder, excludeExtensions],
    };

    return gulp.src(paths.src, { buffer: false })
        .pipe(connection.newer(taskConfig.cdn.destination))
        .pipe(connection.dest(taskConfig.cdn.destination))
        .pipe(customNotifier({ title: 'Assest uploaded to CDN' }));
};

module.exports = uploadTask;
