const test = require('tape')
const solve = require('./')

test('Day 03 - Spiral Memory', t => {
  t.equal(solve(1, '1'), 0)
  t.equal(solve(1, '12'), 3)
  t.equal(solve(1, '23'), 2)
  t.equal(solve(1, '1024'), 31)
  t.equal(solve(1, '312051'), 430)
  t.end()
})

test('Day 03 - Spiral Memory (part 2)', t => {
  t.equal(solve(2, '0'), 1)
  t.equal(solve(2, '1'), 2)
  t.equal(solve(2, '2'), 4)
  t.equal(solve(2, '4'), 5)
  t.equal(solve(2, '6'), 10)
  t.equal(solve(2, '312051'), 312453)
  t.end()
})
