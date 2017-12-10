/**
 * Day 10 - Knot Hash
 *
 * Hashing functions.
 */

const { flatten } = require('../util')

const splitEvery = (n, xs) => {
  const result = []
  for (let i = 0, len = xs.length; i < len; i += 1) {
    if (i % n === 0) {
      result.push([])
    }
    result[result.length - 1].push(xs[i])
  }
  return result
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

  2: (input, size = 256) => {
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

    return flatten(splitEvery(size / 16, list).map(block => block.reduce((x, y) => x ^ y)))
      .map(n => ('0' + n.toString(16)).slice(-2))
      .join('')
  }
}

module.exports = (part, input, size) =>
  solvePart[part](input, size)
module.exports.puzzleName = 'Day 10 - Knot Hash'
