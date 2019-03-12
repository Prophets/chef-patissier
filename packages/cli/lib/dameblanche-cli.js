const shellExec = require('shell-exec');
const args = require('args');

args
    .option('recipe', 'dameblanche recipe name', 'web')
    .option('dir', 'directory');

const flags = args.parse(process.argv);
const dir = flags.dir || args.sub[0] || '.';

const exec = async() => {
    try {
        // find npm package url
        const packageUrl = (await shellExec(`npm view @dameblanche/recipe-${flags.recipe} dist.tarball`)).stdout.trim();
        // make dir
        if (dir !== '.') {
            await shellExec(`mkdir -p ${dir}`);
        }
        // download package
        await shellExec(`curl '${packageUrl}' -o ${dir}/package.tgz`);
        // untar package
        await shellExec(`tar -C ${dir} -zxvf ${dir}/package.tgz `);
        // put package files in the correct place
        await shellExec(`rm -f ${dir}/package.tgz && mv ${dir}/package/* ${dir} && rm -rf ${dir}/package`);
    } catch (e) {
        console.error(e);
    }
};
exec();
