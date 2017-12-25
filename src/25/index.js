/**
 * Day 25 - The Halting Problem
 *
 * Parse and process a state machine.
 */

const Fsm = require('../fsm')

const parseInput = (input) => {
  const groups = input.trim().split('\n\n').map(group => group.split('\n'))
  return groups.slice(1).reduce((acc, group) => {
    const state = group[0].charAt(9)
    acc.states[state] = {
      0: {
        write: Number(group[2].charAt(22)),
        move: group[3].includes('left') ? 'left' : 'right',
        goto: group[4].charAt(26)
      },
      1: {
        write: Number(group[6].charAt(22)),
        move: group[7].includes('left') ? 'left' : 'right',
        goto: group[8].charAt(26)
      }
    }
    return acc
  }, {
    initial: groups[0][0].charAt(15),
    steps: Number(groups[0][1].split(' ')[5]),
    states: {}
  })
}

const createFsm = (ctx, blueprint) =>
  Fsm({
    initial: blueprint.initial,
    states: Object.keys(blueprint.states).reduce((acc, state) => {
      acc[state] = [0, 1].reduce((acc2, val) => {
        acc2[val] = () => {
          if (blueprint.states[state][val].write === 1) {
            ctx[ctx.pointer] = 1
          } else {
            delete ctx[ctx.pointer]
          }
          ctx.pointer += blueprint.states[state][val].move === 'left' ? -1 : 1
          return blueprint.states[state][val].goto
        }
        return acc2
      }, {})
      return acc
    }, {})
  })

const solvePart = {
  // Part 1: Parse the blueprints for a state machine, run it, and return the
  // number of outputs that are 1.
  1: (input) => {
    const blueprint = parseInput(input)
    const ctx = { pointer: 0 }
    const fsm = createFsm(ctx, blueprint)
    let i = 0

    while (i < blueprint.steps) {
      fsm.dispatch(ctx[ctx.pointer] || 0)
      i += 1
    }

    return Object.keys(ctx).length - 1
  },

  // There is no part 2...
  2: () => {}
}

module.exports = (part, input) =>
  solvePart[part](input)
module.exports.puzzleName = 'Day 25 - The Halting Problem'
