/**
 * Day 7 - Recursive Circus
 *
 * Balancing discs. Gross solution, but it works...
 */

const { sumWith } = require('../util')

const parseLine = line => {
  const [p1, p2] = line.split(' -> ')
  const [name, rawWeight] = p1.split(' ')
  const weight = Number(rawWeight.slice(1, -1))
  const programsAbove = p2 === undefined ? [] : p2.split(', ')
  return { name, weight, programsAbove }
}

const getRebalance = disc => {
  const seen = Object.keys(disc).reduce((acc, key) => {
    acc[disc[key]] = acc[disc[key]] || []
    acc[disc[key]].push(key)
    return acc
  }, [])
  const [val1, val2] = Object.keys(seen).map(Number)
  if (seen[val1].length === 1) {
    return {
      name: seen[val1][0],
      delta: val2 - val1
    }
  }
  return {
    name: seen[val2][0],
    delta: val1 - val2
  }
}

const getRootNode = parentGraph =>
  Object.keys(parentGraph).reduce((acc, key) =>
    parentGraph[key] === null ? key : acc, null)

const solvePart = {
  // Part 1: Find the root node
  1: (programs) => {
    const parents = {}

    programs.forEach((program) => {
      parents[program.name] = parents[program.name] || null
      program.programsAbove.forEach((progAbove) => {
        parents[progAbove] = program.name
      })
    })

    return getRootNode(parents)
  },

  // Part 2: Find the disc that is off balance, and return what the weight of
  // the offending node *should* be in order to balance the disc out.
  2: (programs) => {
    const progs = {}
    const parents = {}
    const children = {}

    const getDiscWeight = (progName) => {
      if (!children[progName].length) {
        return progs[progName].weight
      }
      return progs[progName].weight + sumWith(getDiscWeight)(children[progName])
    }

    programs.forEach((program) => {
      progs[program.name] = program
      parents[program.name] = parents[program.name] || null
      program.programsAbove.forEach((progAbove) => {
        parents[progAbove] = program.name
      })
      children[program.name] = program.programsAbove
    })

    const traversePostOrder = (progName, fn) => {
      children[progName].forEach((childProgName) => {
        traversePostOrder(childProgName, fn)
      })
      fn(progName)
    }

    const findUnbalancedDisc = (progName) => {
      let disc = null
      traversePostOrder(progName, (pName) => {
        if (!children[pName].length) { return }
        let found = false
        let weight = null
        const thisDisc = children[pName].reduce((acc, childProgName) => {
          acc[childProgName] = getDiscWeight(childProgName)
          if (weight !== null && weight !== acc[childProgName]) {
            found = true
          }
          weight = acc[childProgName]
          return acc
        }, {})
        if (found && disc === null) {
          disc = thisDisc
        }
      })
      return disc
    }

    const rebalance = getRebalance(findUnbalancedDisc(getRootNode(parents)))
    return progs[rebalance.name].weight + rebalance.delta
  }
}

module.exports = (part, input) =>
  solvePart[part](input.trim().split('\n').map(parseLine))
module.exports.puzzleName = 'Day 7 - Recursive Circus'
