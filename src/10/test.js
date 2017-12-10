const test = require('tape')
const solve = require('./')

test(solve.puzzleName, t => {
  t.equal(solve(1, '3,4,1,5', 5), 12)
  t.end()
})

// test(`${solve.puzzleName} (part 2)`, t => {
//   t.equal(solve(2, '{<>}'), 0)
//   t.equal(solve(2, '{<random characters>}'), 17)
//   t.equal(solve(2, '{<<<<>}'), 3)
//   t.equal(solve(2, '{<{!>}>}'), 2)
//   t.equal(solve(2, '{<!!>}'), 0)
//   t.equal(solve(2, '{<!!!>>}'), 0)
//   t.equal(solve(2, '{<{o"i!a,<{i<a>}'), 10)
//   t.end()
// })
