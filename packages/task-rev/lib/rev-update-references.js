const gulp = require('gulp');
const path = require('path');
const revReplace = require('gulp-rev-replace');
const config = require('@dameblanche/core/lib/configLoader');
const createIgnoredList = require('./create-ignored-list');

// 2) Update asset references with reved filenames in compiled css + js
const revUpdateReferencesTask = () => {
    const manifest = gulp.src(path.join(config.root.dest, 'rev-manifest.json'));
    return gulp.src([path.join(config.root.dest, '/**/**.{css,js}'), ...createIgnoredList()])
        .pipe(revReplace({
            manifest: manifest,
        }))
        .pipe(gulp.dest(config.root.dest));
};

module.exports = revUpdateReferencesTask;
