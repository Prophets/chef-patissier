module.exports = {
    'taskName': 'emails',
    'src': './',
    'childSrc': 'templates',
    'dest': './',
    'htmlmin': {
        'collapseWhitespace': true,
    },
    'extensions': ['js', 'yml', 'yaml'],
    'excludeFolders': ['core', 'layouts', 'partials', 'shared', 'macros', 'data', 'components'],
    'inlinesource': {
        'attribute': 'cssinline',
        'compress': false,
    },
    'mjml': {
        'minify': false,
        'validationLevel': 'strict', // can be skip, soft, strict
    },
};
