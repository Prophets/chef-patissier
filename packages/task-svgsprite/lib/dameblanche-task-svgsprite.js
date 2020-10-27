const config = require('@dameblanche/core/lib/configLoader');
const taskConfig = config.getTaskConfig('svgsprite');
if (!taskConfig) throw new Error('config is required for svgsprite task');

const browserSync = require('browser-sync');
const gulp = require('gulp');
const changed = require('gulp-changed');
const imagemin = require('gulp-imagemin');
const svgstore = require('gulp-svgstore');
const path = require('path');
const customNotifier = require('@dameblanche/core/lib/customNotifier');

const svgSpriteTask = () => {
    const paths = {
        src: path.join(config.root.src, taskConfig.src, '/**/*.+(' + taskConfig.extensions.join('|') + ')'),
        dest: path.join(config.root.dest, taskConfig.dest),
    };

    return gulp.src(paths.src)
        .pipe(changed(paths.dest)) // Ignore unchanged files
        .pipe(imagemin([
            imagemin.svgo({
                plugins: [{
                    removeViewBox: false,
                }],
            }),
        ]))
        .pipe(svgstore())
        .pipe(gulp.dest(paths.dest))
        .pipe(customNotifier({ title: 'SVG sprite compiled' }))
        .pipe(browserSync.stream());
};

module.exports = svgSpriteTask;
