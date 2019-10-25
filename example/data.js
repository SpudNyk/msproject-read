const readStream = require('../mpxj/readStream');
const fs = require('fs');

const main = async args => {
    const projectFile = args[0];
    const data = await readStream(fs.createReadStream(projectFile));
    const { project_title } = data.property_values;
    const { tasks } = data;
    console.log(`Read File: ${projectFile}`);
    console.log(`   Title: ${project_title}`);
    console.log(`   Tasks: ${tasks.length}`);
};

main(process.argv.slice(2));
