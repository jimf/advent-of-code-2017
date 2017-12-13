/**
 * Day 13 - Packet Scanners
 *
 * Send a packet across numerous firewall layers.
 */

const { sumWith } = require('../util')

const parseInput = input =>
  input.trim().split('\n').reduce((acc, line) => {
    acc.push(line.split(': ').map(Number))
    return acc
  }, [])

const isCaught = delay => ([depth, range]) =>
  (depth + delay) % ((range - 1) * 2) === 0

const getsCaught = (layers, delay) =>
  layers.some(isCaught(delay))

const solvePart = {
  // Part 1: Calculate the total penalty for the number of times the packet
  // was detected by security scanners.
  1: (layers) =>
    sumWith(([depth, range]) => depth * range)(layers.filter(isCaught(0))),

  // Part 2: Determine the delay necessary in order to send the packet through
  // without detection. Solution is brute force, but uses a number of
  // techniques to reach an answer without having to iterate over every single
  // state.
  2: (layers) => {
    let delay = 0
    while (getsCaught(layers, delay)) {
      delay += 1
    }
    return delay
  }
}

module.exports = (part, input) =>
  solvePart[part](parseInput(input))
module.exports.puzzleName = 'Day 13 - Packet Scanners'
