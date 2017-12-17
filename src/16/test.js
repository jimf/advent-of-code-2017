const test = require('tape')
const solve = require('./')

const input = 's1,x3/4,pe/b'

test(solve.puzzleName, t => {
  t.equal(solve(1, input, 'abcde'), 'baedc')
  t.end()
})

// test(`${solve.puzzleName} (part 2)`, t => {
//   t.equal(solve(2, input, 'abcde'), 'baedc')
//   t.end()
// })
