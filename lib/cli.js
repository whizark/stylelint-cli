'use strict';

const chalk  = require('chalk');
const finder = require('./finder');

/**
 * Executes a local stylelint.
 */
function execute() {
    const baseDirPath = process.cwd();
    const binPath     = finder.find(baseDirPath);

    if (binPath === null) {
        const message = `
${chalk.red('Oops, cannot find any local stylelint.')}

You can install stylelint by:
${chalk.cyan('npm install stylelint --save-dev')}
`;

        console.error(message);

        process.exitCode = 1;

        return;
    }

    require(binPath);
}

module.exports = {
    execute,
};
