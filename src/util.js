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

exports.flatten = xs => [].concat.apply([], xs)

exports.head = ([x]) => x

exports.max = xs => xs.reduce((acc, x) => x > acc ? x : acc, -Infinity)

exports.sumWith = f => xs => xs.reduce((acc, x) => acc + f(x), 0)

exports.values = (obj) => {
  const result = []
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result.push(obj[key])
    }
  }
  return result
}
