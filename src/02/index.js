/**
 * Day 2 - Corruption Checksum
 *
 * Calculate the checksum of a spreadsheet. For each row, calculate a value
 * for the row, and then sum the values for all rows together. In part 1, a row
 * is valued as the difference between the max value of the row and the min
 * value. In part 2, a row is valued as the quotient between the only two
 * numbers in the row that are evenly divisible with each other.
 */

const { I } = require('../combinators')
const { combinations } = require('../util')

const rowToNumbers = row => row.split(/\s+/g).filter(I).map(Number)

/**
 * Split input into rows, calculate a value for each row, and sum the results.
 */
const getChecksum = (f, input) =>
  input
    .trim()
    .split('\n')
    .reduce((acc, row) => acc + f(rowToNumbers(row)), 0)

const getRowValue = {
  // Part 1: Difference between max and min.
  1: xs => Math.max(...xs) - Math.min(...xs),

  // Part 2: Calculate all combinations of the numbers in the row, find the
  // pair that is evenly divisible, and return the quotient.
  2: xs => combinations(xs)
    .filter(([x, y]) => Math.max(x, y) % Math.min(x, y) === 0)
    .map(([x, y]) => Math.max(x, y) / Math.min(x, y))[0]
}

module.exports = (part, input) =>
  getChecksum(getRowValue[part], input)
module.exports.puzzleName = 'Day 2 - Corruption Checksum'
