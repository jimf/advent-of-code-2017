const test = require('tape')
const solve = require('./')

const input = `
..#
#..
...`.trim()

test(solve.puzzleName, t => {
  t.equal(solve(1, input, 70), 41)
  t.end()
})

test(`${solve.puzzleName} (part 2)`, t => {
  t.equal(solve(2, input, 100), 26)
  t.end()
})
