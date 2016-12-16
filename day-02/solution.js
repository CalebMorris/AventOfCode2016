'use strict';

const fs = require('fs');
const core = require('./core');

function loadFile(filename) {
  const contents = fs.readFileSync(filename, 'utf8').trim();

  return contents;
}

function validate(contents) {
  if (/^[ULDR\n ]*[^ULDR\n ][ULDR\n ]*$/.test(contents)) {
    throw new Error(`Invalid input: ${JSON.stringify(contents)}`);
  }
  return contents;
}

/**
 * "UL\nDR" => ["UL", "DR"]
 */
function parseFile(fileContents) {
  return fileContents.split('\n').map(s => validate(s.trim()));
}

function findBathroomPasscode(directions) {
  let passCode = '';
  let currentPosition = 5;
  for(let valueDirections of directions) {
    for(let direction of valueDirections) {
      currentPosition = core.keypadMove(currentPosition, direction);
    }
    passCode += currentPosition;
  }

  return passCode;
}

function loadAndRunSolution() {
  const args = process.argv.slice(2);
  if (! args.length) {
    throw new Error('Unable to find arg for input file.');
  }

  const formattedInput = parseFile(loadFile(args[0]));
  const solution = findBathroomPasscode(formattedInput);
  console.log(`The passcode is ${solution}`);
  process.exit(0);
}

loadAndRunSolution();
