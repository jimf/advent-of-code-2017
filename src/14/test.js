const test = require('tape')
const solve = require('./')

test(solve.puzzleName, t => {
  t.equal(solve(1, 'flqrgnkx'), 8108)
  t.end()
})

test(`${solve.puzzleName} (part 2)`, t => {
  t.equal(solve(2, 'flqrgnkx'), 1242)
  t.end()
})
