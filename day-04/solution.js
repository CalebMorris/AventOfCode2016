'use strict';

const fs = require('fs');

const roomSchema = /^([a-z-]+)-([0-9]+)\[([a-z]{5})\]$/;

function loadFile(filename) {
  const contents = fs.readFileSync(filename, 'utf8').trim();

  return contents;
}

function parseFile(fileContents) {
  return fileContents.split('\n').map(s => s.trim());
}

function getRealRoomSectorIdSum(inputs) {
  return inputs.reduce((sectorIdSum, room) => {
    if (typeof room !== 'string' || ! roomSchema.test(room)) {
      throw new Error(`room malformed: ${JSON.stringify(room)}`);
    }

    const splitResults = roomSchema.exec(room);
    if (splitResults.length !== 4) {
      throw new Error(`Unable to parse room form: ${JSON.stringify(splitResults)}`);
    }
    // console.log(`splitResults ${splitResults}`);
    const encryptedRoom = splitResults[1];
    const sectorId = Number(splitResults[2]);
    const hashSum = splitResults[3];
    const rehashMap = {};
    const rehashRank = [];
    for(const character of encryptedRoom) {
      // console.log(`character: ${JSON.stringify(character)}`);
      if (character === '-') continue;
      if (! rehashMap[character]) {
        rehashMap[character] = 0;
      }
      rehashMap[character] += 1;
      // console.log(`rehashRank: ${JSON.stringify(rehashRank)}`);
      const rankPosition = rehashRank.findIndex(rank => rank.key === character);
      // console.log(`rankPosition: ${JSON.stringify(rankPosition)}`);
      if (rankPosition > -1) {
        rehashRank.splice(rankPosition, 1);
        // console.log(`sliced rehashRank: ${JSON.stringify(rehashRank)}`);
      }
      rehashRank.push( { key: character, value: rehashMap[character] });
      rehashRank.sort((a, b) => {
        if (a.value < b.value) {
          return 1;
        } else if (a.value > b.value) {
          return -1;
        }
        if (a.key > b.key) {
          return 1;
        } else if (a.key < b.key) {
          return -1;
        }
        return 0;
        a.value > b.value || a.key > b.key
      });
      while(rehashRank.length > 5) {
        rehashRank.pop();
      }
      // console.log(`rehashRank: ${JSON.stringify(rehashRank)}`);
    }
    const rehash = rehashRank.reduce((memo, character) => {
      // console.log(`character: ${JSON.stringify(character)}, memo: ${memo}`);
      return memo + character.key;
    }, '');
    // console.log(`rehash ${rehash}`);
    if (rehash === hashSum) {
      return sectorIdSum + sectorId;
    }
    return sectorIdSum;
  }, 0);
}

function loadAndRunSolution() {
  const args = process.argv.slice(2);
  if (! args.length) {
    throw new Error('Unable to find arg for input file.');
  }

  const formattedInput = parseFile(loadFile(args[0]));
  const solution = getRealRoomSectorIdSum(formattedInput);
  console.log(`The sum of real room sector IDs is: ${solution}`);
  process.exit(0);
}

loadAndRunSolution();
