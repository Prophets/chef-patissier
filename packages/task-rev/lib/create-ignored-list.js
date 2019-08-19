const path = require('path');
const config = require('@dameblanche/core/lib/configLoader');
const ignoreConfig = config.getTaskConfig('rev').ignore;

module.exports = () => {
    return ignoreConfig ? ignoreConfig.map((glob) => {
        return '!' + path.join(config.root.dest, glob);
    }) : [];
};
