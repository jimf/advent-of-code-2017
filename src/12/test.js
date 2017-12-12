const test = require('tape')
const solve = require('./')

const input = `
0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5
`.trim()

test(solve.puzzleName, t => {
  t.equal(solve(1, input), 6)
  t.end()
})

test(`${solve.puzzleName} (part 2)`, t => {
  t.equal(solve(2, input), 2)
  t.end()
})
