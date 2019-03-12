const taskReq = (name) => {
    return require(`${process.cwd()}/node_modules/@dameblanche/task-${name}/lib/dameblanche-task-${name}`);
};

module.exports = taskReq;
