'use strict';

const fs = require('fs');

function loadFile(filename) {
  const contents = fs.readFileSync(filename, 'utf8').trim();

  if (! isContentsValid(contents)) {
    throw new Error('Cotents found was not valid');
  }

  return contents;
}

function isContentsValid(contents) {
  return ! /^[RL0-9, ]*[^RL0-9, ][RL0-9, ]*$/.test(contents);
}

/**
 * "R6, L2" => ["R6", "L2"]
 */
function parseFile(fileContents) {
  return fileContents.split(', ');
}

/**
 * Simple mapping of (1,0) is east, (0,1) is north, (-1,0) is west, (0, -1) is south
 * Rotations will always result in a new 0,1,(-1) value
 * Movement is simply multiply by the value and add to the position
 */
function findEasterHideout(directions) {
  let xMult = 0;
  let yMult = 1;
  let xPos = 0;
  let yPos = 0;

  console.log(`#directions: ${directions.length}`);

  for(let direction of directions) {
    if (typeof direction !== 'string') {
      throw new Error(`Invalid direction: ${JSON.stringify(direction)}`);
    }

    const rotation = direction[0];
    const movement = Number(direction.slice(1));

    // Change direction
    switch(rotation) {
      case('R'):
        if (xMult) {
          yMult = -1 * xMult;
          xMult = 0;
        } else {
          xMult = yMult;
          yMult = 0;
        }
      break;
      case('L'):
        if (yMult) {
          xMult = -1 * yMult;
          yMult = 0;
        } else {
          yMult = xMult;
          xMult = 0;
        }
      break;
      default:
        throw new Error(`Invalid rotation: ${direction}`);
    }

    xPos += xMult * movement;
    yPos += yMult * movement;
  }

  return Math.abs(xPos) + Math.abs(yPos);
}

function loadAndRunSolution() {
  const args = process.argv.slice(2);
  if (! args.length) {
    throw new Error('Unable to find arg for input file.');
  }

  const formattedInput = parseFile(loadFile(args[0]));
  const solution = findEasterHideout(formattedInput);
  console.log(`You are ${solution} blocks away`);
  process.exit(0);
}

loadAndRunSolution();
