import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'url';
import path from 'node:path'
import chalk from 'chalk';

import fileParser from '../lib/fileParser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compiledCodes = String(await readFile(path.resolve(__dirname, '..', 'problem', 'parsed-map-codes.txt')));

const codeLists = fileParser.parse(compiledCodes);

for (const { id, codes } of codeLists) {
    codes.reduce((acc, { tag }) => {
        if (typeof acc === 'string') return acc;

        if (!acc[tag]) acc[tag] = true;
        else throw `Duplicate tag found in MapCode ${id}: ${tag}`;

        return acc;
    }, {});
}

console.log(chalk.green("✓") + " " + chalk.bold("All tests passed!") + " " + chalk.green("✓"));