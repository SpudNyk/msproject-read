const util = require('util');
const convertProjectToJson = require('./convertProjectToJson');
const tmp = require('tmp-promise');
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

const read = async (projectFile, timeout) => {
    return tmp.withFile(
        async ({ path }) => {
            await convertProjectToJson(projectFile, path, timeout);
            return JSON.parse(await readFile(path));
        },
        {
            prefix: 'read-project-',
            // convert needs '.json' at the end
            postfix: '.json',
            // we don't want the file to be held open as convert is writing to it
            discardDescriptor: true
        }
    );
};

module.exports = read;
