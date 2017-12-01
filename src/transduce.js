const { I } = require('./combinators')

exports.transduce = (xf, reducer, seed, collection) => {
  const xfr = xf(reducer)
  let acc = seed
  for (let val of collection) {
    acc = xfr(acc, val)
  }
  return acc
}

exports.compose = (...fns) =>
  fns.reduce((acc, f) =>
    (...args) => acc(f(...args), I))

exports.map = f => reducer => (acc, x) =>
  reducer(acc, f(x))

exports.filter = f => reducer => (acc, x) =>
  f(x) ? reducer(acc, x) : acc

exports.pushReducer = (acc, x) => {
  acc.push(x)
  return acc
}

exports.sumReducer = (acc, x) => acc + x

exports.into = (to, xf, xs) => {
  if (Array.isArray(to)) {
    return exports.transduce(xf, exports.pushReducer, to, xs)
  }
  throw new Error('into: "to" object type unsupported!')
}

exports.sum = (xf, xs) =>
  exports.transduce(xf, exports.sumReducer, 0, xs)
