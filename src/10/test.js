const test = require('tape')
const solve = require('./')

test(solve.puzzleName, t => {
  t.equal(solve(1, '3,4,1,5', 5), 12)
  t.end()
})

test(`${solve.puzzleName} (part 2)`, t => {
  t.equal(solve(2, '230,1,2,221,97,252,168,169,57,99,0,254,181,255,235,167'), '0c2f794b2eb555f7830766bf8fb65a16')
  t.end()
})
