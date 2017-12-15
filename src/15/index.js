/**
 * Day 15 - Dueling Generators
 *
 * Working with generators.
 */

const { K } = require('../combinators')
const { filter, map, take, zip } = require('../gen')
const { compose, pad, sumWith } = require('../util')

const zeroPad = pad('0')

const toBinary = n => zeroPad(32)(n.toString(2))

const parseInput = (input) =>
  input.trim().split('\n').map((line) => Number(line.match(/\d+$/)[0]))

const lowest16BitsMatch = ([x, y]) =>
  x.slice(-16) === y.slice(-16)

function * makeGen (pred, factor, seed) {
  let prev = seed
  while (true) {
    const result = (prev * factor) % 2147483647
    if (pred(result)) {
      yield result
    }
    prev = result
  }
}

const countMatches = iterations =>
  compose(
    sumWith(K(1)),
    filter(lowest16BitsMatch),
    map(([a, b]) => [toBinary(a), toBinary(b)]),
    take(iterations)
  )

const solvePart = {
  1: ([seedA, seedB], iterations = 4e7) =>
    countMatches(iterations)(zip(
      makeGen(K(true), 16807, seedA),
      makeGen(K(true), 48271, seedB)
    )),

  2: ([seedA, seedB], iterations = 5e6) =>
    countMatches(iterations)(zip(
      makeGen(x => x % 4 === 0, 16807, seedA),
      makeGen(y => y % 8 === 0, 48271, seedB)
    ))
}

module.exports = (part, input, iterations) =>
  solvePart[part](parseInput(input), iterations)
module.exports.puzzleName = 'Day 15 - Dueling Generators'
