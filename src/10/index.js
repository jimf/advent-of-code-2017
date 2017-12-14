/**
 * Day 10 - Knot Hash
 *
 * Hashing functions.
 */

const { concatMap, splitEvery } = require('../util')

const xorAll = xs => xs.reduce((x, y) => x ^ y)

const knotHash = (input, size = 256) => {
  const lengths = input.split('')
    .map(c => c.charCodeAt(0))
    .concat([17, 31, 73, 47, 23])
  const list = (new Array(size)).fill(0).map((_, idx) => idx)
  let current = 0
  let skip = 0
  let iterations = 0

  while (iterations < 64) {
    lengths.forEach((len) => {
      let i = current
      let j = (i + len) - 1
      while (i < j) {
        const tmp = list[j % size]
        list[j % size] = list[i % size]
        list[i % size] = tmp
        i += 1
        j -= 1
      }
      current += len + skip
      skip += 1
    })

    iterations += 1
  }

  return concatMap(xorAll, splitEvery(size / 16, list))
    .map(n => ('0' + n.toString(16)).slice(-2))
    .join('')
}

const solvePart = {
  1: (input, size = 256) => {
    const lengths = input.split(',').map(Number)
    const list = (new Array(size)).fill(0).map((_, idx) => idx)
    let current = 0
    let skip = 0

    lengths.forEach((len) => {
      let i = current
      let j = (i + len) - 1
      while (i < j) {
        const tmp = list[j % size]
        list[j % size] = list[i % size]
        list[i % size] = tmp
        i += 1
        j -= 1
      }
      current += len + skip
      skip += 1
    })

    return list[0] * list[1]
  },

  2: knotHash
}

module.exports = (part, input, size) =>
  solvePart[part](input, size)
module.exports.puzzleName = 'Day 10 - Knot Hash'
module.exports.knotHash = knotHash
