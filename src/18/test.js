const test = require('tape')
const solve = require('./')

test(solve.puzzleName, t => {
  const input = `
set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2`.trim()

  t.equal(solve(1, input), 4)
  t.end()
})

test(`${solve.puzzleName} (part 2)`, t => {
  const input = `
snd 1
snd 2
snd p
rcv a
rcv b
rcv c
rcv d`.trim()

  t.equal(solve(2, input), 3)
  t.end()
})
