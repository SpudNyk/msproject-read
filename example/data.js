const readStream = require('../mpxj/readStream');
const fs = require('fs');
const convertDocumentTypes = require('../project-types/convertDocumentTypes');

const main = async args => {
    const projectFile = args[0];
    const document = await readStream(fs.createReadStream(projectFile)).then(
        convertDocumentTypes
    );
    const { project_title, current_date } = document.property_values;
    const { tasks } = document;
    console.log(`Read File: ${projectFile}`);
    console.log(`   Date: ${current_date}`);
    console.log(`   Title: ${project_title}`);
    console.log(`   Tasks: ${tasks.length}`);
    tasks.forEach(({ name, id, start, duration, estimated, finish }) => {
        console.log(`        Name: ${name}`);
        console.log(`        ID: ${id}`);
        console.log(`        Estimated: ${estimated}`);
        console.log(`        Start: ${start}`);
        console.log(`        Finish: ${finish}`);
        console.log(`        Duration: ${duration}`);
    });
};

main(process.argv.slice(2));
