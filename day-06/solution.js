'use strict';

const fs = require('fs');

function loadFile(filename) {
  const contents = fs.readFileSync(filename, 'utf8').trim();

  return contents;
}

function parseContent(inputText) {
  return inputText.split('\n').map(s => s.trim());
}

function getJammedSignalMessage(corruptedMessages) {
  if (! Array.isArray(corruptedMessages) || corruptedMessages.length === 0) {
    throw new Error(`Invalid input format: ${typeof corruptedMessages}`);
  }
  const messageLength = corruptedMessages[0].length;

  let reconstructedMessage = '';
  for(let i = 0; i < messageLength; i++) {
    let bestMatch = '';
    let bestMatchCount = 0;
    const letterCountMap = {};
    for(const corruptedMessage of corruptedMessages) {
      const character = corruptedMessage[i];
      if (! letterCountMap[character]) {
        letterCountMap[character] = 0;
      }
      letterCountMap[character] += 1;
      if (letterCountMap[character] > bestMatchCount) {
        bestMatch = character;
        bestMatchCount = letterCountMap[character];
      }
    }
    reconstructedMessage += bestMatch;
  }

  return reconstructedMessage;
}

function loadAndRunSolution() {
  const args = process.argv.slice(2);
  if (! args.length) {
    throw new Error('Unable to find arg for input file.');
  }

  const formattedInput = parseContent(loadFile(args[0]));
  const solution = getJammedSignalMessage(formattedInput);
  console.log(`The corrected message is ${solution}`);
  process.exit(0);
}

loadAndRunSolution();
