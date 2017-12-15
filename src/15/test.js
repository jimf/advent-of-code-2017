const test = require('tape')
const solve = require('./')

const input = `
Generator A starts with 65
Generator B starts with 8921
`.trim()

test(solve.puzzleName, t => {
  t.equal(solve(1, input, 5), 1)
  t.end()
})

// Part 2 omitted. Too slow.
