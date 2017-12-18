/**
 * Day 17 - Spinlock
 */

const solvePart = {
  // Part 1: Run the spinlock and after inserting 2017, report value value that
  // comes immediately after where 2017 is located.
  1: (steps) => {
    let buffer = [0]
    let pos = 0
    for (let value = 1; value < 2018; value += 1) {
      pos = ((pos + steps) % buffer.length) + 1
      buffer = buffer.slice(0, pos).concat([value].concat(buffer.slice(pos)))
    }
    return buffer[buffer.indexOf(2017) + 1]
  },

  // Part 2: Run 50M iterations and report what comes immediately after 0. The
  // trick here is that 0 always appears first, so rather than manipulate an
  // actual array, which is slow, just pretend to and keep track of what gets
  // inserted at index 1.
  2: (steps) => {
    let pos = 0
    let value = 0
    let valAfterZero = null
    for (let i = 0; i < 5e7; i += 1) {
      pos = ((pos + steps) % (value + 1)) + 1
      value += 1
      if (pos === 1) {
        valAfterZero = value
      }
    }
    return valAfterZero
  }
}

module.exports = (part, input) =>
  solvePart[part](Number(input))
module.exports.puzzleName = 'Day 17 - Spinlock'
