# Mapcodes tp

### Prerequisites
 - [node lts or greater](https://nodejs.org/en/)

### For Mac/*nix
1. run `npm run init` in the root directory
2. Thats it, you're cool, go solve the problem

### For Windows
1. run `npm ci`
2. copy `example.env` into a file called `.env` in the same directory
3. run `npm run generateCodes`
4. Code or something idk

### How to run your code
#### Javascript
 - `npm start`

#### Python
 - `npm run run-py`\
 if the above doesn't work
 - `python problem/parse_map_code.py`\
 if the above doesn't work, figure out your python

## The Problem

The goal of this problem is to read in the file `map-codes.txt`,

then rewrite it to a new file called `parsed-map-codes.txt`

However we want to change some things around, I can't find a good
way to put it to text, so I will show you an example using a single map code

#### Example input map code
```
MapCode 13
	GNQ 760
	GNQ 377
	CHE 915
	CHE 724
	GNQ 429
	POM 313
	CHE 333
	VBO 729
	GNQ 737
	CHE 69
	POM 30
	VBO 467
	CHE 615
	CHE 434
	JTD 159
	GNQ 725
	VBO 704
```

#### Example output for the above input
```
MapCode 13
	GNQ 377 429 725 737 760
	CHE 69 333 434 615 724 915
	POM 30 313
	VBO 467 704 729
	JTD 159
```

Effectively we want to compile codes by their tag (the first the letters),
while doing this we also want to remove any duplicate values, and maintain
the original formatting.

Just to be 100% clear there is one space between `MapCode` and the number after it,
as well as in between the codes themselves and their values

There is also a tab character (you can create one of these like this in a string "\t")

As the tests never read your code, feel free to do whatever you want below this!