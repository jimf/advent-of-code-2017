const test = require('tape')
const solve = require('./')

test('Day 01 - Inverse Captcha', t => {
  t.equal(solve(1, '1122'), 3)
  t.equal(solve(1, '1111'), 4)
  t.equal(solve(1, '1234'), 0)
  t.equal(solve(1, '91212129'), 9)
  t.end()
})

test('Day 01 - Inverse Captcha (part 2)', t => {
  t.equal(solve(2, '1212'), 6)
  t.equal(solve(2, '1221'), 0)
  t.equal(solve(2, '123425'), 4)
  t.equal(solve(2, '123123'), 12)
  t.equal(solve(2, '12131415'), 4)
  t.end()
})
