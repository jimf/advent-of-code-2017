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

exports.concatMap = (f, xs) =>
  xs.reduce((acc, x) => {
    const r = f(x)
    acc = acc || (r.empty ? r.empty() : [])
    return acc.concat(r)
  }, null)

exports.head = ([x]) => x

exports.flatten = xs => [].concat.apply([], xs)

exports.pad = c => width => s => {
  let result = s
  while (result.length < width) {
    result = c + result
  }
  return result
}

exports.max = xs => xs.reduce((acc, x) => x > acc ? x : acc, -Infinity)

exports.range = (from, to) => {
  let result = []
  for (let i = from; i < to; i += 1) {
    result.push(i)
  }
  return result
}

exports.splitEvery = (n, xs) => {
  const result = []
  for (let i = 0, len = xs.length; i < len; i += 1) {
    if (i % n === 0) {
      result.push([])
    }
    result[result.length - 1].push(xs[i])
  }
  return result
}

exports.sumWith = f => xs => {
  let acc = 0
  for (let x of xs) {
    acc = acc + f(x)
  }
  return acc
}

exports.values = (obj) => {
  const result = []
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result.push(obj[key])
    }
  }
  return result
}
