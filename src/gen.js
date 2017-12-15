exports.filter = f => function * filter (xs) {
  for (const x of xs) {
    if (f(x)) {
      yield x
    }
  }
}

exports.map = f => function * map (xs) {
  for (const x of xs) {
    yield f(x)
  }
}

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

exports.zip = function * zip (gen1, gen2) {
  while (true) {
    const a = gen1.next()
    const b = gen2.next()
    if (!a.done && !b.done) {
      yield [a.value, b.value]
    } else {
      break
    }
  }
}
