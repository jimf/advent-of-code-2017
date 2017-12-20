const test = require('tape')
const solve = require('./')

const input = [
  '     |          ',
  '     |  +--+    ',
  '     A  |  C    ',
  ' F---|----E|--+ ',
  '     |  |  |  D ',
  '     +B-+  +--+ '
].join('\n')

test(solve.puzzleName, t => {
  t.equal(solve(1, input), 'ABCDEF')
  t.end()
})

test(`${solve.puzzleName} (part 2)`, t => {
  t.equal(solve(2, input), 38)
  t.end()
})
