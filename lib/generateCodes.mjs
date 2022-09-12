const randomRange = (min, max) => Math.floor(Math.random() * (max - min) + min);

// Returns a string of 3 random capital letters
function randomMapCode() {
    return String.fromCharCode(
        randomRange(65, 90), 
        randomRange(65, 90), 
        randomRange(65, 90)
    );
}

const getValidCodes = (length) => Array.from({ length }, () => randomMapCode());

function mapCodeToString(mapCode) { 
    return `MapCode ${mapCode.id}\n${
        mapCode.codes.reduce((acc, code) => acc + `\t${code.tag} ${code.value}\n`, '')
    }`;
}

function mapCodesToString(mapCodes) {
    return mapCodes.reduce((acc, mapCode) => acc += mapCodeToString(mapCode) + '\n', '');
}

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

export default function generateMapCodeFileString(numMapCodes) {
    return mapCodesToString(generateMapCodes(numMapCodes));
}