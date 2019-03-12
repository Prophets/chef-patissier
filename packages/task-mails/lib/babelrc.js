module.exports = {
    'presets': [
        '@babel/preset-react',
        '@babel/preset-env',
    ],
    'plugins': [[
        'auto-import', {
            'declarations': [
                { 'default': 'React', 'members': ['Component'], 'path': 'react' },
            ],
        },
    ]],
};
