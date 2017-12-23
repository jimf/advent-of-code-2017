/**
 * Day 22 - Sporifica Virus
 *
 * Simulate an infection spreading.
 */

const N = 0
const E = 1
const S = 2
const W = 3
const NO_MOVE = 0
const RIGHT = 1
const REVERSE = 2
const LEFT = 3

const toKey = (row, col) => `${row},${col}`

const parseInput = input => {
  const lines = input.trim().split('\n')
  const h = lines.length
  const w = lines[0].length
  const result = {}
  for (let i = 0; i < h; i += 1) {
    for (let j = 0; j < w; j += 1) {
      if (lines[i].charAt(j) === '.') { continue }
      const row = i - Math.floor(h / 2)
      const col = j - Math.floor(w / 2)
      result[toKey(row, col)] = '#'
    }
  }
  return result
}

const turn = (currentDirection, state) =>
  (currentDirection + (state === '#' ? RIGHT : LEFT)) % 4

const turnEvolved = (currentDirection, state) => {
  const turnMap = {
    'undefined': LEFT,
    W: NO_MOVE,
    '#': RIGHT,
    F: REVERSE
  }
  return (currentDirection + turnMap[state]) % 4
}

const updateState = (row, col, state) => {
  const key = toKey(row, col)
  if (state[key] === '#') {
    delete state[key]
    return false
  } else {
    state[key] = '#'
    return true
  }
}

const updateStateEvolved = (row, col, state) => {
  const key = toKey(row, col)
  switch (state[key]) {
    case undefined:
      state[key] = 'W'
      break

    case 'W':
      state[key] = '#'
      return true

    case '#':
      state[key] = 'F'
      break

    case 'F':
      delete state[key]
      break
  }
  return false
}

const run = (input, bursts, turnFn, updateFn) => {
  const boardState = parseInput(input)
  let row = 0
  let col = 0
  let direction = N
  let i = 0
  let infectionsCaused = 0

  while (i < bursts) {
    const key = toKey(row, col)
    direction = turnFn(direction, boardState[key])
    infectionsCaused += (updateFn(row, col, boardState)) === true ? 1 : 0

    switch (direction) {
      case N:
        row -= 1
        break
      case S:
        row += 1
        break
      case W:
        col -= 1
        break
      case E:
        col += 1
        break
    }

    i += 1
  }

  return infectionsCaused
}

const solvePart = {
  // Part 1: Return the number of infections caused, based on simple rules.
  1: (input, bursts = 1e4) =>
    run(input, bursts, turn, updateState),

  // Part 2: Return the number of infections caused, based on slightly more
  // complex rules.
  2: (input, bursts = 1e7) =>
    run(input, bursts, turnEvolved, updateStateEvolved)
}

module.exports = (part, input, bursts) =>
  solvePart[part](input, bursts)
module.exports.puzzleName = 'Day 22 - Sporifica Virus'
