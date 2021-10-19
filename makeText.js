/** Command-line tool to generate Markov text. */

const process = require('process');
const argv = process.argv;
const { MarkovMachine } = require('./markov');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

function genFromFile(filename) {
    
    const text = fs.readFileSync(path.join(__dirname, filename), {encoding: 'utf8'});

    const m = new MarkovMachine(text);
    console.log(`... generated text from file ${filename} ...`);
    console.log(m.makeText());
}

function genFromUrl(url) {
    const resp = axios.get('https://www.google.com')
        .then(resp => {
            const m = new MarkovMachine(resp.data);
            console.log(m.makeText());
        })
        .catch(err => {
            console.error(`Error fetching data from ${url}`);
            console.error(err.message);
            process.exit(1);
        });
    
    console.log(resp);
}

if (argv.length !== 4) {
    console.error('Error: Must have exactly 4 arguments.');
    process.exit(1);
}

if (argv[2] == 'file') {
    console.log('file', argv[3]);
    genFromFile(argv[3]);
} else if (argv[2] == 'url') {
    if (argv[3].slice(0, 4) != 'http') {
        console.error('Error: must be URL');
        process.exit(1);
    }
    genFromUrl(argv[3]);
} else {
    console.error(`could not recognize argument ${argv[2]}.`);
    console.error('acceptable arguments include "url" and "file".');
    process.exit(1);
}