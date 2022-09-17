import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'url';
import path from 'node:path'
import chalk from 'chalk';

import fileParser from '../lib/fileParser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function parseMapCodeFile(path) { return fileParser.parse(""+await readFile(path)); }

const origCodeLists = 
    await parseMapCodeFile(path.resolve(__dirname, '..', 'problem', 'map-codes.txt'));
const codeLists = 
    await parseMapCodeFile(path.resolve(__dirname, '..', 'problem', 'parsed-map-codes.txt'));

for (const { id, codes } of codeLists) {
    // Check for duplicate tags
    codes.reduce((acc, { tag }) => {
        if (typeof acc === 'string') return acc;

        if (!acc[tag]) acc[tag] = true;
        else throw `Duplicate tag found in MapCode ${id}: ${tag}`;

        return acc;
    }, {});
}

const zippedCodeLists = codeLists.map((codes, i) => [codes.codes, origCodeLists[i].codes]);

function reduceCodes(acc, { tag, values }) {
    acc[tag] = (acc[tag]) ? [].concat(acc[tag], values) : values;
    return acc;
}

for (let i = 0; i < zippedCodeLists.length; i++) {
    const [oCodes, iCodes] = zippedCodeLists[i];

    const compilesOutputCodes = oCodes.reduce(reduceCodes, {});
    const compiledInputCodes = iCodes.reduce(reduceCodes, {});

    for (const tag in compiledInputCodes) {
        if (!(compiledInputCodes[tag]?.sort().join(',') == compilesOutputCodes[tag]?.sort().join(',')))
            throw `Incorrect values: MapCode ${i+1}`
    }
}

console.log(chalk.green("✓") + " " + chalk.bold("All tests passed!") + " " + chalk.green("✓"));