/**
 * Day 23 - Coprocessor Conflagration
 *
 * More instruction interpretation.
 */

const lookup = v => s => /-?\d+/.test(v) ? Number(v) : s[v]

const createCommands = () => ({
  set: ([x, y]) => s => Object.assign({}, s, { [x]: lookup(y)(s), pointer: s.pointer + 1 }),
  sub: ([x, y]) => s => Object.assign({}, s, { [x]: s[x] - lookup(y)(s), pointer: s.pointer + 1 }),
  mul: ([x, y]) => s => Object.assign({}, s, { [x]: s[x] * lookup(y)(s), pointer: s.pointer + 1 }),
  jnz: ([x, y]) => s => Object.assign({}, s, { pointer: s.pointer + (lookup(x)(s) !== 0 ? lookup(y)(s) : 1) })
})

const getInstruction = commands => line =>
  commands[line.slice(0, 3)](line.slice(4).split(' '))

const solvePart = {
  // Part 1: Interpret instructions and return the number of times a "mul"
  // instruction was run.
  1: (instructions) => {
    let result = 0
    let state = { a: 0, b: 0, c: 0, d: 0, e: 0, f: 0, g: 0, h: 0, pointer: 0 }
    const cmds = createCommands()
    const origMul = cmds.mul
    cmds.mul = (...args) => {
      result += 1
      return origMul(...args)
    }
    const getInst = getInstruction(cmds)

    while (state.pointer >= 0 && state.pointer < instructions.length) {
      state = getInst(instructions[state.pointer])(state)
    }

    return result
  },

  // Part 2: Figure out what the instructions are doing and return what the
  // "h" register would contain if the instructions were evaluated. Running
  // the program would take considerable time.
  //
  // NOTE: Not sure if this will work for all inputs.
  2: (instructions) => {
    const inst0Val = Number(instructions[0].split(' ')[2])
    const inst4Val = Number(instructions[4].split(' ')[2])
    const inst5Val = Number(instructions[5].split(' ')[2])
    const inst7Val = Number(instructions[7].split(' ')[2])
    const reg = { a: 1, b: inst0Val, c: inst0Val, d: 0, e: 0, f: 0, g: 0, h: 0 }

    reg.b = reg.b * inst4Val - inst5Val
    reg.c = reg.b - inst7Val

    do {
      reg.f = 1
      reg.d = 2

      for (let { d } = reg; d * d < reg.b; ++d) {
        if (reg.b % d === 0) {
          reg.f = 0
          break
        }
      }

      if (reg.f === 0) { reg.h += 1 }
      reg.g = reg.b - reg.c
      reg.b += 17
    } while (reg.g !== 0)

    return reg.h
  }
}

module.exports = (part, input) =>
  solvePart[part](input.trim().split('\n'))
module.exports.puzzleName = 'Day 23 - Coprocessor Conflagration'
