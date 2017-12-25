const test = require('tape')
const solve = require('./')

const input = `
Begin in state A.
Perform a diagnostic checksum after 6 steps.

In state A:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state B.
  If the current value is 1:
    - Write the value 0.
    - Move one slot to the left.
    - Continue with state B.

In state B:
  If the current value is 0:
    - Write the value 1.
    - Move one slot to the left.
    - Continue with state A.
  If the current value is 1:
    - Write the value 1.
    - Move one slot to the right.
    - Continue with state A.
`.trim()

test(solve.puzzleName, t => {
  t.equal(solve(1, input), 3)
  t.end()
})

// test(`${solve.puzzleName} (part 2)`, t => {
//   t.equal(solve(2, input), 19)
//   t.end()
// })
