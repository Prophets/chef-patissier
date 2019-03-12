require('dotenv').config();

module.exports = {
    'excludeExtensions': ['html', 'css'],
    'cdn': {
        'path': process.env.CDN_BASE_URL + '/' + process.env.CDN_DESTINATION,
        'host': process.env.CDN_HOST,
        'user': process.env.CDN_USER,
        'password': process.env.CDN_PASSWORD,
        'port': 21,
        'destination': process.env.CDN_DESTINATION,
    },
};
