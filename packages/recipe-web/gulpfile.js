const chef = require('@dameblanche/core');

const config = {
    'root': {
        'src': './src',
        'dest': './public'
    },
    'browsersync': {
    },
    // Grouped by what can run in parallel
    'tasks': [
        ['clean'],
        ['eslint', 'stylelint'],
        ['images', 'svgsprite', 'static'],
        ['templates', 'css', [ 'webpack', { ifProduction: true }]],
        [['rev', { ifProduction: true }]],
        [['sizeReport', { ifProduction: true }]]
    ]
};

module.exports = chef(config);
