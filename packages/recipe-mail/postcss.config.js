module.exports = ({ options }) => {
    return {
        plugins: {
            'autoprefixer': {},
            'cssnano': options.production ? {} : false,
        }
    };
}
