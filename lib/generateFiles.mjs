import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'url';
import path from 'node:path'

import * as dotenv from 'dotenv'
dotenv.config()

import generateCodes from './generateCodes.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await writeFile(path.resolve(__dirname, '..', 'problem', 'map-codes.txt'), generateCodes(process.env.NUM_MAP_CODES));