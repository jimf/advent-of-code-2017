const test = require('tape')
const solve = require('./')

test(solve.puzzleName, t => {
  t.equal(solve(1, '5 1 9 5\n7 5 3  \n2 4 6 8'), 18)
  t.end()
})

test(`${solve.puzzleName} (part 2)`, t => {
  t.equal(solve(2, '5 9 2 8\n9 4 7 3\n3 8 6 5'), 9)
  t.end()
})
