exports.numbers = function * numbers () {
  let n = 0
  while (true) {
    yield n
    n += 1
  }
}

exports.take = n => function * take (xs) {
  for (const x of xs) {
    yield x
    n -= 1
    if (n <= 0) { break }
  }
}
