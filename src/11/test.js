const test = require('tape')
const solve = require('./')

test(solve.puzzleName, t => {
  t.equal(solve(1, 'ne,ne,ne'), 3)
  t.equal(solve(1, 'ne,ne,sw,sw'), 0)
  t.equal(solve(1, 'se,sw,se,sw,sw'), 3)
  t.end()
})

test(`${solve.puzzleName} (part 2)`, t => {
  t.equal(solve(2, 'ne,ne,ne'), 3)
  t.equal(solve(2, 'ne,ne,sw,sw'), 2)
  t.equal(solve(2, 'se,sw,se,sw,sw'), 3)
  t.end()
})
