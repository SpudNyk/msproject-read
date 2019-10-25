const readFile = require('./readFile');
const tmp = require('tmp-promise');
const fs = require('fs');

const writeStreamToFile = async (readable, file) =>
    new Promise((resolve, reject) => {
        const complete = () => {
            resolve(file);
        };
        const writable = fs.createWriteStream(file);
        writable.on('close', complete);
        readable.on('error', err => {
            // cleanup
            writable.off('close', complete);
            writable.close();
            reject(err);
        });
        // copy to readable
        readable.pipe(writable);
    });

const readStream = async (readable, timeout) => {
    return tmp.withFile(
        async ({ path }) => {
            await writeStreamToFile(readable, path);
            return readFile(path, timeout);
        },
        {
            prefix: 'stream-project-',
            // we don't want the file to be held open as convert is writing to it
            discardDescriptor: true
        }
    );
};

module.exports = readStream;
