/**
 * Day 16 - Permutation Promenade
 *
 * Run a series of instructions on an input.
 */

const { B, W } = require('../combinators')

const spin = len => xs =>
  xs.slice(-len).concat(xs.slice(0, xs.length - len))

const exchange = ([i, j]) => xs => {
  const result = xs.slice(0)
  const tmp = result[j]
  result[j] = result[i]
  result[i] = tmp
  return result
}

const indexesOfBoth = ([x, y]) => xs => {
  const result = []
  for (let i = 0, len = xs.length; i < len; i += 1) {
    if (xs[i] === x || xs[i] === y) {
      result.push(i)
      if (result.length === 2) { return result }
    }
  }
}

const partner = (ab) => W(B(exchange, indexesOfBoth(ab)))
// => equivalent to: exchange(indexesOfBoth(ab)(xs))(xs)

const getInstruction = inst => {
  switch (inst.charAt(0)) {
    case 's': return spin(Number(inst.slice(1)))
    case 'x': return exchange(inst.slice(1).split('/').map(Number))
    case 'p': return partner(inst.slice(1).split('/'))
  }
}

const playDance = (instructions, programs) =>
  instructions.reduce(
    (acc, inst) => getInstruction(inst)(acc),
    programs.split('')
  ).join('')

const solvePart = {
  // Part 1: Play instructions and return resulting state
  1: playDance,

  // Part 2: Do the same thing, but 1 billion times, using the previous result
  // as the input for the following iteration. The trick here is to detect a
  // cycle and determine the result early, rather than actually run through 1
  // billion iterations.
  2: (instructions, programs) => {
    let acc = programs
    let i = 0
    const seen = [acc]
    while (i < 1e9) {
      acc = playDance(instructions, acc)
      if (seen.includes(acc)) {
        return seen[1e9 % (i + 1)]
      } else {
        seen.push(acc)
        i += 1
      }
    }
    return acc // Note: we're counting on this line never getting hit.
  }
}

module.exports = (part, input, programs = 'abcdefghijklmnop') =>
  solvePart[part](input.trim().split(','), programs)
module.exports.puzzleName = 'Day 16 - Permutation Promenade'
