'use strict';

const fs = require('fs');

function loadFile(filename) {
  const contents = fs.readFileSync(filename, 'utf8').trim();

  return contents;
}

function parseContent(inputText) {
  return inputText.split('\n')
    .map(
      s => {
        const address = s.trim();
        if (! /[a-z]+(\[[a-z]+\][a-z]+)+/.test(address)) {
          throw new Error(`Invalid IP format: ${JSON.stringify(address)}`);
        }
        const validSegments = [];
        const filterSegments = [];
        address.split('[').forEach(s => {
          const innerSplitResults = /([a-z]*)\]([a-z]*)/.exec(s);
          if (innerSplitResults) {
            if (innerSplitResults[1]) {
              filterSegments.push(innerSplitResults[1]);
            }
            if (innerSplitResults[2]) {
              validSegments.push(innerSplitResults[2]);
            }
          } else {
            validSegments.push(s);
          }
        });
        return {
          validSegments,
          filterSegments,
        };
      }
    );
}

function getTLSSupportedAddressCount(ipAddresses) {
  function hasABBA(text) {
    const abbaRegex = /([a-z])([a-z])\2\1/;
    const regexResults = abbaRegex.exec(text);
    if (
      regexResults &&
      regexResults.length === 3 &&
      regexResults[1] !== regexResults[2]
    ) {
        return regexResults;
    };
  }

  return ipAddresses.reduce((validAddressCount, ipAddressSegments) => {
    const hasInvalidSegment = ipAddressSegments
      .filterSegments.reduce((hasFoundInvalidSegment, segment) => {
        return hasFoundInvalidSegment || hasABBA(segment);
      }, false);
    if (hasInvalidSegment) {
      return validAddressCount;
    }

    const hasValidSegment = ipAddressSegments
      .validSegments.reduce((hasFoundValidSegment, segment) => {
        return hasFoundValidSegment || hasABBA(segment);
      }, false);
    if (hasValidSegment) {
      return validAddressCount + 1;
    }

    return validAddressCount;
  }, 0)
}

function loadAndRunSolution() {
  const args = process.argv.slice(2);
  if (! args.length) {
    throw new Error('Unable to find arg for input file.');
  }

  const formattedInput = parseContent(loadFile(args[0]));
  const solution = getTLSSupportedAddressCount(formattedInput);
  console.log(`The number of TLS supported addresses is ${solution}`);
  process.exit(0);
}

loadAndRunSolution();
