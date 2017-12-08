const test = require('tape')
const solve = require('./')

const input = `
b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10
`.trim()

test(solve.puzzleName, t => {
  t.equal(solve(1, input), 1)
  t.end()
})

test(`${solve.puzzleName} (part 2)`, t => {
  t.equal(solve(2, input), 10)
  t.end()
})
