const path = require('path');
const util = require('util');
const readdir = util.promisify(require('fs').readdir);
const execFile = util.promisify(require('child_process').execFile);

// use the mpxj library
const mpxjClassPath = [path.join(__dirname, 'mpxj.jar')];
const mpxjLibDir = path.join(__dirname, 'lib');
const mpxjConvertMainClass = 'net.sf.mpxj.sample.MpxjConvert';

const appendJarsFromDir = async (list, dir) => {
    const entries = await readdir(dir, {
        withFileTypes: true
    });
    for (let entry of entries) {
        if (entry.isFile() && entry.name.endsWith('.jar')) {
            list.push(path.join(dir, entry.name));
        }
    }
    return list;
};

// gets the class path list of jars for mpxj
const getMpxjClassPath = async () => {
    if (mpxjClassPath.length > 1) {
        return mpxjClassPath;
    }
    return appendJarsFromDir(mpxjClassPath, mpxjLibDir);
};

const changeExtension = (name, ext) => name.replace(/(?:\.[^./\\]*?)?$/, ext);

async function convertProjectToJson(
    projectFile,
    jsonFile = changeExtension(projectFile, '.json'),
    timeout = 0
) {
    const classpath = await getMpxjClassPath();
    try {
        const output = await execFile(
            'java',
            [
                '-cp',
                classpath.join(path.delimiter),
                mpxjConvertMainClass,
                projectFile,
                jsonFile
            ],
            {
                timeout,
                windowsHide: true
            }
        );
        return {
            projectFile,
            jsonFile,
            output
        };
    } catch (e) {
        const error = new Error('Invalid Project');
        error.output = {
            stdout: e.stdout,
            stderr: e.stderr
        };
        throw error;
    }
}

module.exports = convertProjectToJson;
