const test = require('tape')
const solve = require('./')

test(solve.puzzleName, t => {
  /* eslint no-tabs:0 */
  t.equal(solve(1, '0	2	7	0'), 5)
  t.equal(solve(1, '11 11 13 7 0 15 5 5 4 4 1 1 7 1 15 11'), 4074)
  t.end()
})

test(`${solve.puzzleName} (part 2)`, t => {
  /* eslint no-tabs:0 */
  t.equal(solve(2, '0	2	7	0'), 4)
  t.equal(solve(2, '11 11 13 7 0 15 5 5 4 4 1 1 7 1 15 11'), 2793)
  t.end()
})
