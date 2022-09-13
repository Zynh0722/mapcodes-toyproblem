start = mapcodes

mapcodes
    = (@mapcode "\n")+

mapcode
    = "MapCode " id:numbers "\n" codes:(@code "\n")+ { return { id, codes } }

code
    = "\t" tag:tag values:(_ @numbers)+ { return { tag, values } }

numbers
    = digits:[0-9]+ { return digits.join(''); }
    
tag
    = letters:([A-Z][A-Z][A-Z]) { return letters.join('') }

_ "whitespace"
    = " "