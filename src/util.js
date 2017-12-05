const { B, I } = require('./combinators')

exports.combinations = (xs) => {
  const result = []
  for (let i = 0; i < xs.length; i += 1) {
    for (let j = i + 1; j < xs.length; j += 1) {
      result.push([xs[i], xs[j]])
    }
  }
  return result
}

exports.compose = (...fns) => x => fns.reduce(B, I)(x)

exports.head = ([x]) => x

exports.sumWith = f => xs => xs.reduce((acc, x) => acc + f(x), 0)
