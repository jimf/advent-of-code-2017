/**
 * Day 21 - Fractal Art
 *
 * Build out a pattern following a set of rules.
 */

const { I } = require('../combinators')
const { compose, flatten, sumWith } = require('../util')

const rotateRight = matrix => {
  const result = []
  for (let i = 0, len = matrix.length; i < len; i += 1) {
    for (let j = 0; j < len; j += 1) {
      if (result[j] === undefined) { result[j] = [] }
      result[j][len - 1 - i] = matrix[i][j]
    }
  }
  return result
}

const flipH = matrix =>
  matrix.map(xs => {
    const ys = xs.slice(0)
    ys.reverse()
    return ys
  })

const flipV = matrix => {
  const result = matrix.slice(0)
  result.reverse()
  return result
}

const matrixToPattern = matrix =>
  matrix.map(xs => xs.map(x => x === 1 ? '#' : '.').join(''))
  .join('/')

const patternToMatrix = pattern =>
  pattern
    .split('/')
    .map(part => part.split('').map(c => c === '#' ? 1 : 0))

const divideMatrix = matrix => {
  const result = []
  const size = matrix.length % 2 === 0 ? 2 : 3
  for (let i = 0, len = matrix.length; i < len; i += 1) {
    for (let j = 0; j < len; j += 1) {
      const ii = Math.floor(i / size)
      const jj = Math.floor(j / size)
      if (result[ii] === undefined) { result[ii] = [] }
      if (result[ii][jj] === undefined) { result[ii][jj] = [] }
      if (result[ii][jj][i % size] === undefined) { result[ii][jj][i % size] = [] }
      result[ii][jj][i % size][j % size] = matrix[i][j]
    }
  }
  return result
}

const joinMatrices = matrices => {
  const result = []
  for (let i = 0, numMatrices = matrices.length; i < numMatrices; i += 1) {
    for (let j = 0; j < numMatrices; j += 1) {
      for (let k = 0, len = matrices[0][0].length; k < len; k += 1) {
        for (let l = 0; l < len; l += 1) {
          const ii = (i * len) + k
          const jj = (j * len) + l
          if (result[ii] === undefined) { result[ii] = [] }
          result[ii][jj] = matrices[i][j][k][l]
        }
      }
    }
  }
  return result
}

const mapMatrices = (f, matrices) => {
  const result = []
  for (let i = 0, len = matrices.length; i < len; i += 1) {
    for (let j = 0; j < len; j += 1) {
      if (result[i] === undefined) { result[i] = [] }
      result[i][j] = f(matrices[i][j])
    }
  }
  return result
}

const parseInput = input =>
  input.trim().split('\n').reduce((acc, line) => {
    const [pattern, output] = line.split(' => ')
    acc[pattern] = () => patternToMatrix(output)
    return acc
  }, {})

const permutations = [
  I,
  rotateRight,
  compose(rotateRight, rotateRight),
  compose(rotateRight, rotateRight, rotateRight),
  flipH,
  flipV,
  compose(flipH, rotateRight),
  compose(flipH, rotateRight, rotateRight),
  compose(flipH, rotateRight, rotateRight, rotateRight),
  compose(flipV, rotateRight),
  compose(flipV, rotateRight, rotateRight),
  compose(flipV, rotateRight, rotateRight, rotateRight),
  compose(rotateRight, flipH),
  compose(rotateRight, rotateRight, flipH),
  compose(rotateRight, rotateRight, rotateRight, flipH),
  compose(rotateRight, flipV),
  compose(rotateRight, rotateRight, flipV),
  compose(rotateRight, rotateRight, rotateRight, flipV)
]

const enhance = rules => matrix => {
  for (let xf of permutations) {
    const pattern = matrixToPattern(xf(matrix))
    if (pattern in rules) {
      return rules[pattern]()
    }
  }
  throw new Error('no rule found!')
}

const initialMatrix = () => [[0, 1, 0], [0, 0, 1], [1, 1, 1]]

const makeArt = (iterations, rules) => {
  let art = initialMatrix()
  let n = 0
  const enhanceFn = enhance(rules)
  while (n < iterations) {
    art = joinMatrices(mapMatrices(enhanceFn, divideMatrix(art)))
    n += 1
  }
  return art
}

const solvePart = {
  // Part 1: Count the number of cells that are "on" after 5 iterations.
  1: (rules, iterations = 5) =>
    sumWith(I)(flatten(makeArt(iterations, rules))),

  // Part 2: Count the number of cells that are "on" after 18 iterations.
  2: (rules, iterations = 18) =>
    sumWith(I)(flatten(makeArt(iterations, rules)))
}

module.exports = (part, input, iterations) =>
  solvePart[part](parseInput(input), iterations)
module.exports.puzzleName = 'Day 21 - Fractal Art'
