const test = require('tape')
const solve = require('./')

const input = `
0/2
2/2
2/3
3/4
3/5
0/1
10/1
9/10
`.trim()

test(solve.puzzleName, t => {
  t.equal(solve(1, input), 31)
  t.end()
})

test(`${solve.puzzleName} (part 2)`, t => {
  t.equal(solve(2, input), 19)
  t.end()
})
