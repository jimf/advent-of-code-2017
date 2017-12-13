const test = require('tape')
const solve = require('./')

const input = `
0: 3
1: 2
4: 4
6: 4
`.trim()

test(solve.puzzleName, t => {
  t.equal(solve(1, input), 24)
  t.end()
})

test(`${solve.puzzleName} (part 2)`, t => {
  t.equal(solve(2, input), 10)
  t.end()
})
