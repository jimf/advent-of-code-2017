exports.I = x => x
exports.B = (f, g) => x => f(g(x))
exports.K = x => _ => x
