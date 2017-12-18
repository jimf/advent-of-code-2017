const test = require('tape')
const solve = require('./')

test(solve.puzzleName, t => {
  t.equal(solve(1, '3'), 638)
  t.end()
})

// test(`${solve.puzzleName} (part 2)`, t => {
//   t.equal(solve(2, input, 'abcde'), 'baedc')
//   t.end()
// })
