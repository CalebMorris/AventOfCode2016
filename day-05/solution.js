'use strict';

const fs = require('fs');
const crypto = require('crypto');

function loadFile(filename) {
  const contents = fs.readFileSync(filename, 'utf8').trim();

  return contents;
}

function getPasswordFromDoorId(doorId) {
  function hashText(text) {
    return crypto.createHash('md5').update(text).digest('hex');
  }

  const passwordRegexCheck  = /^00000([a-f0-9])/;
  const baseText = doorId;
  let password = '';

  let counter = 0;
  while(password.length < 8) {
    const currentText = baseText + counter;
    const hash = hashText(currentText);
    const regexResults = passwordRegexCheck.exec(hash);
    if (regexResults && regexResults.length == 2) {
      password += regexResults[1];
      console.log(`found next item at ${currentText}, password: ${password}`);
    }
    counter += 1;
  }

  return password;
}

function loadAndRunSolution() {
  const args = process.argv.slice(2);
  if (! args.length) {
    throw new Error('Unable to find arg for input file.');
  }

  const formattedInput = loadFile(args[0]);
  const solution = getPasswordFromDoorId(formattedInput);
  console.log(`The door password is ${solution} for id ${formattedInput}`);
  process.exit(0);
}

loadAndRunSolution();
