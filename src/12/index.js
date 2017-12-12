/**
 * Day 12 - Digital Plumber
 *
 * Graph traversal.
 */

const { bfs } = require('../graph')

const parseInput = (input) => {
  const result = {}
  input.trim().split('\n').forEach((line) => {
    const [program, group] = line.split(' <-> ')
    result[program] = group.split(', ')
  })
  return result
}

const difference = (setA, setB) => {
  const result = new Set([])
  for (let item of setA) {
    if (!setB.has(item)) {
      result.add(item)
    }
  }
  return result
}

const collectGroup = (key, graph) => {
  const result = new Set([])
  // Use a breadth-first search to traverse all paths
  bfs((program) => {
    result.add(program)
    // Always return false, as we want to traverse as far as possible.
    return false
  }, key, graph)
  return result
}

const solvePart = {
  // Part 1: Find the number of nodes that can lead back to 0
  1: (graph) => collectGroup('0', graph).size,

  // Part 2: Find the total number of "groups" in the graph
  2: (graph) => {
    const groups = []
    let remaining = new Set(Object.keys(graph))
    while (remaining.size) {
      const key = remaining.values().next().value
      const group = collectGroup(key, graph)
      groups.push(group)
      remaining = difference(remaining, group)
    }
    return groups.length
  }
}

module.exports = (part, input) =>
  solvePart[part](parseInput(input))
module.exports.puzzleName = 'Day 12 - Digital Plumber'
