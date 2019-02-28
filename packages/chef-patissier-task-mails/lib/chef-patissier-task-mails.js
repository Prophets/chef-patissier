require('@babel/register')({
    'only': [
        (file) => file.indexOf('render.js') > 0 || file.indexOf('/src/') > 0
    ],
    ...require('./babelrc')
});

const config = require('chef-patissier/lib/configLoader');

const taskConfig = config.getTaskConfig('mails');
if (!taskConfig) throw new Error('config is required for mails task');

const browserSync = require('browser-sync');
const data = require('gulp-data');
const gulp = require('gulp');
const merge = require('merge-stream');
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const handleErrors = require('chef-patissier/lib/handleErrors');
const customNotifier = require('chef-patissier/lib/customNotifier');
const fileExists = require('file-exists');
const rename = require('gulp-rename');
const flatten = require('lodash/flatten');
const getFolders = require('chef-patissier/lib/getFolders');
const PluginError = require('plugin-error');
const replaceExtension = require('replace-ext');
const through = require('through2');

const getLanguages = (folder) => {
    let location = './' + folder;

    if (!fileExists.sync(path.join(config.root.src , folder, 'config.yaml'))) {
        location = './core';
    }

    const langPath = path.resolve(config.root.src, location);
    const data = yaml.safeLoad(fs.readFileSync(path.join(langPath, 'config.yaml'), 'utf8'));

    return data.languages;
}

const getData = (folder, lang) => {
    let allData = {};

    allData['folder'] = folder;

    const filePaths = [
        { type: 'core', file: path.resolve(config.root.src, './core/data', lang + '.yaml') },
        { type: 'content', file: path.resolve(config.root.src, folder, './data', lang + '.yaml') }
    ];

    filePaths.forEach((filePath) => {
        allData[filePath.type] = yaml.safeLoad(fs.readFileSync(filePath.file),'utf8');
    });

    return allData;
};

const reactMjmlRender = function () {
    return through.obj(function (file, enc, cb) {
        try{
            const render = require('./render').default;
            const { html, error } = render(file.path, file.data, taskConfig.mjml);

            if(html) {
                file.contents = Buffer.from(html);

                file.path = replaceExtension(file.path, '.html')

                this.push(file);
                cb();
            }
            if (error) {
                this.emit('error', new PluginError('gulp-mjml-react', error, {fileName: file.path}));
                cb();
            }
        } catch(e) {
            let message = e.message;
            if(message.indexOf('ValidationError:') === 0 ){
                message = message + '\n \nNOTE: If you have no other option then forcing this markup set config.emails.mjml.validationLevel to "soft"';
            }
            this.emit('error', new PluginError('gulp-mjml-react', message, {fileName: file.path}));
            cb();
        }
    });
}

const emailsTask = () => {
    const exclude = path.normalize('!**/{' + taskConfig.excludeFolders.join(',') + '}/**');

    const imagesRoot = global.production ? config.root.cdnPath : '';

    const tasks = getFolders(config.root.src).map((folder) => {

        const imagesDestination = imagesRoot + '/' + folder + '/images';

        const subtasks = getLanguages(folder).map((lang) => {
            const paths = {
                src: [path.join(config.root.src, folder, taskConfig.childSrc,  '/**/*.{' + taskConfig.extensions + '}'), exclude],
                dest: path.join(config.root.dest, taskConfig.dest, folder, '/')
            };

            return gulp.src(paths.src)
                .pipe(data({...getData(folder, lang), imagesDestination}))
                .on('error', handleErrors)
                .pipe(reactMjmlRender())
                .on('error', handleErrors)
                .pipe(rename({suffix: '-' + lang}))
                .on('error', handleErrors)
                .pipe(gulp.dest(paths.dest))
                .on('end', browserSync.reload)
                .pipe(customNotifier({ title: 'E-mail template(s) compiled' }));
        });

        return subtasks;
    });

    return merge(flatten(tasks));
};


gulp.task('emails', emailsTask);

module.exports = emailsTask;
