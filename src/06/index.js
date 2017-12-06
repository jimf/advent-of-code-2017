/**
 * Day 6 - Memory Reallocation
 *
 * Redistribute blocks of memory until a block allocation is encountered for
 * the second time. Redistribution works as follows: find the index of the max
 * value. Set that index to 0, storing the value first. Redistribute the value
 * in round robin fashion, starting with the next index and circling back to
 * the beginning if the end is reached.
 */

const findIndexOfMax = xs => {
  let result = -1
  let max = -Infinity
  for (let i = 0; i < xs.length; i += 1) {
    if (xs[i] > max) {
      result = i
      max = xs[i]
    }
  }
  return result
}

const redistributeBlocks = (f, blocksStr) => {
  let result = null
  const blocks = blocksStr.split(/\s/g).map(Number)
  let numCycles = 0
  let seen = { [blocks.join(' ')]: true }
  let done = false

  while (!done) {
    const idx = findIndexOfMax(blocks)
    const val = blocks[idx]
    blocks[idx] = 0
    for (let i = 0; i < val; i += 1) {
      blocks[(idx + 1 + i) % blocks.length] += 1
    }
    const key = blocks.join(' ')
    numCycles += 1
    if (seen[key]) {
      done = true
      result = f(numCycles, seen[key])
    }
    seen[key] = numCycles
  }

  return result
}

const solvePart = {
  // Part 1: Return the number of cycles it took to see the repeat
  1: numCycles => numCycles,

  // Part 2: Return the number of cycles between the first and second time the
  // repeat was seen
  2: (numCycles, prevNumCycles) => numCycles - prevNumCycles
}

module.exports = (part, input) =>
  redistributeBlocks(solvePart[part], input)
module.exports.puzzleName = 'Day 6 - Memory Reallocation'
