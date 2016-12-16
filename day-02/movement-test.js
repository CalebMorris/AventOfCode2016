'use strict';

const keypadMove = require('./core').keypadMove;
const assert = require('chai').assert;

describe('day-2', function() {
  describe('keypadMove', function() {
    it('should stay on 1 if going left', function() {
      for(const input of [1,4,7]) {
        assert.equal(keypadMove(input, 'L'), input, `input: L${input}`);
      }
    });
    it('should stay on 3 if going right', function() {
      for(const input of [3,6,9]) {
        assert.equal(keypadMove(input, 'R'), input, `input: R${input}`);
      }
    });
    it('should stay on 2 if going up', function() {
      for(const input of [1,2,3]) {
        assert.equal(keypadMove(input, 'U'), input, `input: U${input}`);
      }
    });
    it('should stay on 8 if going down', function() {
      for(const input of [7,8,9]) {
        assert.equal(keypadMove(input, 'D'), input, `input: D${input}`);
      }
    });
    it('should move if it can', function() {
      for(const input of [2,3,5,6,8,9]) {
        assert.equal(keypadMove(input, 'L'), input - 1, `input: L${input}`);
      }
      for(const input of [1,2,4,5,7,8]) {
        assert.equal(keypadMove(input, 'R'), input + 1, `input: R${input}`);
      }
      for(const input of [4,5,6,7,8,9]) {
        assert.equal(keypadMove(input, 'U'), input - 3, `input: U${input}`);
      }
      for(const input of [1,2,3,4,5,6]) {
        assert.equal(keypadMove(input, 'D'), input + 3, `input: D${input}`);
      }
    });
  })
});
