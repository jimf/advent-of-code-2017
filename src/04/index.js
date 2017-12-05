/**
 * Day 4 - High-Entropy Passphrases
 *
 * Count the number of valid passphrases included in the input. A passphrase is
 * valid if the phrase contains 0 repeated words. In part 2, an added security
 * measure is in place that requires that none of the words can be repeated if
 * the word's letters are rearranged.
 */

const { I } = require('../combinators')
const { sumWith } = require('../util')

const sortChars = word => {
  let chars = word.split('')
  chars.sort()
  return chars.join('')
}

const countValidPassphrases = (input, useAddedSecurity) =>
  sumWith(line => {
    // For part 2, no need to worry about enumerating letter combinations. The
    // words can effectively be normalized by sorting the letters once.
    const words = line.split(' ').map(useAddedSecurity ? sortChars : I)
    return (new Set(words)).size === words.length ? 1 : 0
  })(input.split('\n'))

const solvePart = {
  1: input => countValidPassphrases(input, false),
  2: input => countValidPassphrases(input, true)
}

module.exports = (part, input) =>
  solvePart[part](input)
module.exports.puzzleName = 'Day 4 - High-Entropy Passphrases'
