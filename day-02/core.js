function keypadMove(position, movement) { // 1, U
  const rowConst = Math.floor((position - 1) / 3); // 0
  const colConst = (position - 1) % 3; // 0

  if (movement === 'L' || movement === 'R') {
    if (movement === 'L') {
      return rowConst * 3 + Math.max(colConst - 1, 0) + 1;
    } else {
      return rowConst * 3 + Math.min(colConst + 1, 2) + 1;
    }
  } else {
    if (movement === 'U') {
      // 0 * 3 + 0 + 1
      return Math.max(rowConst - 1, 0) * 3 + colConst + 1;
    } else {
      return Math.min(rowConst + 1, 2) * 3 + colConst + 1;
    }
  }
}

module.exports = {
  keypadMove,
};
