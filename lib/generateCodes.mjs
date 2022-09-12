const randomRange = (min, max) => Math.floor(Math.random() * (max - min) + min);

/**
 * @returns {string} a string containing 3 capital letters A-Z
 */
function randomMapCode() {
    return String.fromCharCode(
        randomRange(65, 90), 
        randomRange(65, 90), 
        randomRange(65, 90)
    );
}


/**
 * @param {int} length number of strings to generate
 * @returns {string[]} a list of strings containing 3 capital letters
 */
const getValidCodes = (length) => Array.from({ length }, () => randomMapCode());


/**
 * @param {[
 *      {
 *          id: int
 *          codes: [
 *              tag: string,
 *              value: Number[]
 *          ]
 *      }
 * ]} mapCode 
 * @returns a string containing the map code data
 */
function mapCodeToString(mapCode) { 
    return `MapCode ${mapCode.id}\n${
        mapCode.codes.reduce((acc, code) => acc + `\t${code.tag} ${code.value}\n`, '')
    }`;
}


/**
 * Compiles a list of map codes into a single file with
 * a blank line between each map code
 * 
 * @param {[
 *      {
 *          id: int
 *          codes: [
 *              tag: string,
 *              value: Number[]
 *          ]
 *      }
 * ]} mapCodes 
 * @returns {string} string containing all the map codes
 */
function mapCodesToString(mapCodes) {
    return mapCodes.reduce((acc, mapCode) => acc += mapCodeToString(mapCode) + '\n', '');
}


/**
 * This is the function that does the heavy lifting regarding
 * map code generation. it creates a number of map codes based on
 * input, then for each one, selects a random number of valid map codes,
 * and a random number of total map codes, then generates an array with the data
 * 
 * @param {int} length total number of map codes to generate
 * @returns {[
 *      {
 *          id: int
 *          codes: [
 *              tag: string,
 *              value: Number[]
 *          ]
 *      }
 * ]} a list of map codes
 */
function generateMapCodes(length) {
    return Array.from({ length }, (_, i) => {
        let validCodes = getValidCodes(randomRange(3, 20));
    
        return {
            id: i+1,
            codes: Array.from({ length: randomRange(5, 50) }, () => ({ 
                tag: validCodes[randomRange(0, validCodes.length)],
                value: randomRange(1, 999)
            }))
        };
    })
}


/**
 * This is the penultimate function of this file, it calls
 * the methods necessary to both generate the map codes and
 * convert them into a file storable string
 * 
 * @param {int} numMapCodes number of map codes to generate
 * @returns the contents of a map codes file in a string
 */
export default function generateMapCodeFileString(numMapCodes) {
    return mapCodesToString(generateMapCodes(numMapCodes));
}