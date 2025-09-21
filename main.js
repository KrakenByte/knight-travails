function isWithinBounds(pos) {
  if (pos[0] < 0 || pos[0] > 7 || pos[1] < 0 || pos[1] > 7) {
    return false;
  } else {
    return true;
  }
}

function getValidMoves(pos) {
  const moves = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [-1, 2],
    [-1, -2],
    [1, -2],
  ];
  const result = [];
  for (const move of moves) {
    let newPos = [pos[0] + move[0], pos[1] + move[1]];
    if (isWithinBounds(newPos)) {
      result.push(newPos);
    }
  }
  return result;
}

function knightMoves(start, end) {
  if (!isWithinBounds(start) || !isWithinBounds(end)) {
    return new Error("Start or End positions are not within bounds.");
  }

  const q = [];
  const cameFrom = {};
  const visited = new Set();

  q.push(start);
  visited.add(start.toString());
  loop1: while (q.length !== 0) {
    let curr = q.shift();
    loop2: for (move of getValidMoves(curr)) {
      if (!visited.has(move.toString())) {
        visited.add(move.toString());
        q.push(move);
        cameFrom[move.toString()] = curr;
        if (move[0] == end[0] && move[1] == end[1]) {
          break loop1;
        }
      }
    }
  }
  let path = [end];
  let current = end.toString();

  while (cameFrom[current]) {
    const prev = cameFrom[current];
    path.unshift(prev);
    current = prev.toString();
  }

  return {
    path,
    moves: path.length - 1
  }
}

console.log(knightMoves([0, 0], [7, 7]));
