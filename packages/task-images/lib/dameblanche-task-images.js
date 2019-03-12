const config = require('@dameblanche/core/lib/configLoader');
const taskConfig = config.getTaskConfig('images');
if (!taskConfig) throw new Error('config is required for images task');

const browserSync = require('browser-sync');
const changed = require('gulp-changed');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const path = require('path');
const customNotifier = require('@dameblanche/core/lib/customNotifier');

const imagesTask = () => {
    const paths = {
        src: path.join(config.root.src, taskConfig.src, '/**/*.{' + taskConfig.extensions + '}'),
        dest: path.join(config.root.dest, taskConfig.dest),
    };

    return gulp.src([paths.src, '*!README.md'])
        .pipe(changed(paths.dest)) // Ignore unchanged files
        .pipe(imagemin()) // Optimize
        .pipe(gulp.dest(paths.dest))
        .pipe(customNotifier({ title: 'Images minified' }))
        .pipe(browserSync.stream());
};

module.exports = imagesTask;
