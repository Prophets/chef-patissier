const fs = require('fs')
const taskEnabled = (name) => {
    return fs.existsSync(`${process.cwd()}/node_modules/dameblanche-task-${name}/package.json`)
}

module.exports = taskEnabled;
