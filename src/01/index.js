/**
 * Day 1 - Inverse Captcha
 *
 * Review a sequence of digits and find the sum of all digits that match a
 * corresponding digit in the list (p1 = next, p2 = half the list over). The
 * list is treated as circular for the purposes of finding the "next" digit.
 */

const gen = require('../gen')
const t = require('../transduce')
const { head } = require('../util')

/**
 * Imperative solution. Iterate over the indices of the input, comparing the
 * digit at the index with the digit at the corresponding index. Add the value
 * to the accumulated sum if the digits match.
 */
/*
const getInverseCaptcha = (getNext, input) => {
  let sum = 0
  for (let i = 0; i < input.length; i += 1) {
    if (input[i] === input[getNext(i)]) {
      sum += parseInt(input[i], 10)
    }
  }
  return sum
}
*/

/**
 * Declarative solution. Utilizes transducers and generators to lazily
 * evaluate [index, corresponding-index] pairs, doing the same comparisons and
 * accumulations above. Like the imperative solution, the list is only
 * traversed once, and no extra space is required due to the lazy list
 * generation.
 */
const getInverseCaptcha = (getNext, input) => {
  const mapToPair = t.map(i => [Number(input[i]), Number(input[getNext(i)])])
  const filterMatchingDigits = t.filter(([i, j]) => i === j)
  const mapToValue = t.map(head)
  return t.sum(
    t.compose(mapToPair, filterMatchingDigits, mapToValue),
    gen.take(input.length)(gen.numbers())
  )
}

const getNext = {
  1: len => i => (i + 1) % len,
  2: len => i => (i + (len / 2)) % len
}

module.exports = (part, input) =>
  getInverseCaptcha(getNext[part](input.length), input)
module.exports.puzzleName = 'Day 1 - Inverse Captcha'
