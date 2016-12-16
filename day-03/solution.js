'use strict';

const fs = require('fs');

function loadFile(filename) {
  const contents = fs.readFileSync(filename, 'utf8').trim();

  return contents;
}

/**
 * "1 2 3\n4 5 6" => [[1,2,3], [4,5,6]]
 */
function parseFile(fileContents) {
  return fileContents.split('\n')
    .map(
      s => s
        .trim()
        .split(' ')
        .filter(x => !! x)
        .map(l => Number(l))
    );
}

function getValidTriangleCount(inputs) {
  if (! Array.isArray(inputs) || ! inputs.length) {
    throw new Error('Inputs must be an array of triangle lengths');
  }

  inputs = inputs.filter(triangle => {
    if (! Array.isArray(triangle) || triangle.length !== 3) {
      throw new Error(`Triangle invalid format: ${JSON.stringify(triangle)}`);
    }

    triangle.sort((a, b) => a > b);

    return triangle[0] + triangle[1] > triangle[2];
  });

  return inputs.length;
}

function loadAndRunSolution() {
  const args = process.argv.slice(2);
  if (! args.length) {
    throw new Error('Unable to find arg for input file.');
  }

  const formattedInput = parseFile(loadFile(args[0]));
  const solution = getValidTriangleCount(formattedInput);
  console.log(`The number of valid triangles is ${solution}`);
  process.exit(0);
}

loadAndRunSolution();
