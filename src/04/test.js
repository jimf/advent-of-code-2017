const test = require('tape')
const solve = require('./')

test(solve.puzzleName, t => {
  const input = [
    'aa bb cc dd ee',
    'aa bb cc dd aa',
    'aa bb cc dd aaa'
  ].join('\n')
  t.equal(solve(1, input), 2)
  t.end()
})

test(`${solve.puzzleName} (part 2)`, t => {
  const input = [
    'abcde fghij',
    'abcde xyz ecdab',
    'a ab abc abd abf abj',
    'iiii oiii ooii oooi oooo',
    'oiii ioii iioi iiio'
  ].join('\n')
  t.equal(solve(2, input), 3)
  t.end()
})
