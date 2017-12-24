/**
 * Day 24 - Electromagnetic Moat
 *
 * Connect nodes together.
 */

const { compose, maxWith, sumWith } = require('../util')

const parseLine = (line) => {
  const [left, right] = line.split('/').map(Number)
  return { left, right }
}

const flipComponent = ({ left, right, isFlipped }) => {
  if (isFlipped) {
    return { left: right, right: left }
  }
  return { left: right, right: left, isFlipped: true }
}

/**
 * Return a list of [component, ...components] pairs, where the initial
 * component has left:n (flipping if needed) and components is a list of the
 * remaining components.
 */
const collectComponents = (n, components) => {
  const result = []
  for (let i = 0, len = components.length; i < len; i += 1) {
    const component = components[i]
    if (component.left === n) {
      result.push([component, components.filter(c => c !== component)])
    } else if (component.right === n) {
      result.push([flipComponent(component), components.filter(c => c !== component)])
    }
  }
  return result
}

/**
 * Build out a tree. The root node is the only node without a value. Other
 * nodes have a component as their value, with the first level children having
 * left:0. Descendents have a left that pairs with the right of their parent.
 */
const buildTree = (components) => {
  const build = (node, target, remaining) => {
    const next = collectComponents(target, remaining)
    if (next.length === 0) { return }
    next.forEach(([c, cs]) => {
      const nextNode = { value: c, children: [] }
      build(nextNode, c.right, cs)
      node.children.push(nextNode)
    })
  }

  const tree = { value: null, root: true, children: [] }
  build(tree, 0, components)
  return tree
}

/**
 * Walk the given tree and return all root-to-leaf paths within the tree.
 */
const getValidConnections = (tree) => {
  const result = []
  const getPath = (node, path = []) => {
    const nextPath = node.value ? path.concat([node.value]) : path
    if (node.children.length === 0) {
      result.push(nextPath)
    } else {
      node.children.forEach((child) => {
        getPath(child, nextPath)
      })
    }
  }
  getPath(tree)
  return result
}

const solvePart = {
  // Part 1: Return the maximum value of the possible valid bridges that are
  // buildable.
  1: compose(
    maxWith(sumWith(({ left, right }) => left + right)),
    getValidConnections,
    buildTree
  ),

  // Part 2: Return the value of the longest bridge possible, tie-breaking with
  // max.
  2: (paths) => {
    const longestLen = paths.reduce((acc, path) => acc > path.length ? acc : path.length, 0)
    return maxWith(({ left, right }) => left + right)(paths.filter(p => p.length === longestLen))
  }
}

module.exports = (part, input) =>
  solvePart[part](input.trim().split('\n').map(parseLine))
module.exports.puzzleName = 'Day 24 - Electromagnetic Moat'
