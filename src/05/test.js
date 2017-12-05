const test = require('tape')
const solve = require('./')

test(solve.puzzleName, t => {
  t.equal(solve(1, '0\n3\n0\n1\n-3'), 5)
  t.end()
})

test(`${solve.puzzleName} (part 2)`, t => {
  t.equal(solve(2, '0\n3\n0\n1\n-3'), 10)
  t.end()
})
