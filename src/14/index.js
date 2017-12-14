/**
 * Day 14 - Disk Defragmentation
 *
 * Reuse the knotHash solution from day 10 to hash an input and convert to
 * binary, solving additional problems.
 */

const { range, sumWith } = require('../util')
const { knotHash } = require('../10')

const hexToBin = hex =>
  ('000' + parseInt(hex, 16).toString(2)).slice(-4)

const hashToBinary = hash =>
  hash.split('').map(hexToBin).join('')

const createGrid = keyString =>
  range(0, 128).map(n => hashToBinary(knotHash(`${keyString}-${n}`)))

const uniqueId = (function () {
  let id = 0
  return function () {
    id += 1
    return `id${id}`
  }
}())

// Flood fill algorithm, adapted to be queue-based to avoid maximum stack call errors.
const fillGroup = (grid, groupId, i, j) => {
  const queue = [[i, j]]
  while (queue.length) {
    const [_i, _j] = queue.shift()
    grid[_i][_j] = groupId
    if (_i > 0 && grid[_i - 1][_j] === '1') { queue.push([_i - 1, _j]) }
    if (_i < 127 && grid[_i + 1][_j] === '1') { queue.push([_i + 1, _j]) }
    if (_j > 0 && grid[_i][_j - 1] === '1') { queue.push([_i, _j - 1]) }
    if (_j < 127 && grid[_i][_j + 1] === '1') { queue.push([_i, _j + 1]) }
  }
}

const solvePart = {
  // Part 1: Return the number of 1s present after generating a binary grid
  1: (keyString) =>
    sumWith(str => str.length)(createGrid(keyString).map(hash => hash.replace(/0/g, ''))),

  // Part 2: Return the number of contiguous groups of 1s in the generated grid
  2: (keyString) => {
    const grid = createGrid(keyString).map(hash => hash.split(''))
    let groups = 0
    for (let i = 0; i < 128; i += 1) {
      for (let j = 0; j < 128; j += 1) {
        if (grid[i][j] !== '1') { continue }
        groups += 1
        fillGroup(grid, uniqueId(), i, j)
      }
    }
    return groups
  }
}

module.exports = (part, input) =>
  solvePart[part](input)
module.exports.puzzleName = 'Day 14 - Disk Defragmentation'
