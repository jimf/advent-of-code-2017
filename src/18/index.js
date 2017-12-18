/**
 * Day 18 - Duet
 *
 * Interpret a series of primitive commands and calculate a result.
 */

const lookup = v => s =>
  /-?\d+/.test(v) ? Number(v) : (s[v] || 0)

const createCommands = extra => Object.assign({
  set: ([x, y]) => s => Object.assign({}, s, { [x]: lookup(y)(s), pointer: s.pointer + 1 }),
  add: ([x, y]) => s => Object.assign({}, s, { [x]: s[x] + lookup(y)(s), pointer: s.pointer + 1 }),
  mul: ([x, y]) => s => Object.assign({}, s, { [x]: s[x] * lookup(y)(s), pointer: s.pointer + 1 }),
  mod: ([x, y]) => s => Object.assign({}, s, { [x]: s[x] % lookup(y)(s), pointer: s.pointer + 1 }),
  jgz: ([x, y]) => s => Object.assign({}, s, { pointer: s.pointer + (lookup(x)(s) > 0 ? lookup(y)(s) : 1) })
}, extra)

const getInstruction = commands => line =>
  commands[line.slice(0, 3)](line.slice(4).split(' '))

const solvePart = {
  // Part 1: Return the value of the last sound that was successfully recovered.
  1: (instructions) => {
    let state = { pointer: 0, recovers: [] }
    const getInst = getInstruction(createCommands({
      snd: ([x]) => s => Object.assign({}, s, { 'lastSound': lookup(x)(s), pointer: s.pointer + 1 }),
      rcv: ([x]) => s => Object.assign({}, s, { recovers: s.recovers.concat([lookup(x)(s) !== 0 ? s.lastSound : null]), pointer: s.pointer + 1 })
    }))

    while (state.pointer >= 0 && state.pointer < instructions.length) {
      if (state.recovers[state.recovers.length - 1] != null) {
        return state.recovers[state.recovers.length - 1]
      }
      state = getInst(instructions[state.pointer])(state)
    }

    return null
  },

  // Part 2: Return how many times program 1 sent a message to program 0.
  2: (instructions) => {
    let result = 0
    let state0 = { pointer: 0, p: 0 }
    let state1 = { pointer: 0, p: 1 }
    const mbox0 = []
    const mbox1 = []
    const getInst0 = getInstruction(createCommands({
      snd: ([x]) => s => {
        mbox1.push(lookup(x)(s))
        return Object.assign({}, s, { pointer: s.pointer + 1 })
      },
      rcv: ([x]) => s => {
        if (mbox0.length) {
          const val = mbox0.shift()
          return Object.assign({}, s, { [x]: val, pointer: s.pointer + 1 })
        }
        return s
      }
    }))
    const getInst1 = getInstruction(createCommands({
      snd: ([x]) => s => {
        mbox0.push(lookup(x)(s))
        result += 1
        return Object.assign({}, s, { pointer: s.pointer + 1 })
      },
      rcv: ([x]) => s => {
        if (mbox1.length) {
          const val = mbox1.shift()
          return Object.assign({}, s, { [x]: val, pointer: s.pointer + 1 })
        }
        return s
      }
    }))

    while (state0.pointer >= 0 && state0.pointer < instructions.length && state1.pointer >= 0 && state1.pointer < instructions.length) {
      // Check for deadlock
      if (instructions[state0.pointer].startsWith('rcv') &&
          instructions[state1.pointer].startsWith('rcv') &&
          mbox0.length === 0 &&
          mbox1.length === 0) {
        break
      }
      state0 = getInst0(instructions[state0.pointer])(state0)
      state1 = getInst1(instructions[state1.pointer])(state1)
    }

    return result
  }
}

module.exports = (part, input) =>
  solvePart[part](input.trim().split('\n'))
module.exports.puzzleName = 'Day 18 - Duet'
