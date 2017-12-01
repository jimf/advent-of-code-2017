const { B, I } = require('./combinators')

exports.compose = (...fns) => x => fns.reduce(B, I)(x)

exports.head = ([x]) => x
