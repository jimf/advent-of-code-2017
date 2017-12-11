/**
 * Day 11 - Hex Ed
 *
 * Calculate distances on a haxagonal grid.
 */

const { compose } = require('../util')

/**
 * See http://keekerdc.com/2011/03/hexagon-grids-coordinate-systems-and-distance-calculations/
 */
const step = ({ x, y, z }, direction) => {
  switch (direction) {
    case 'n': return { x, y: y + 1, z: z - 1 }
    case 'ne': return { x: x + 1, y, z: z - 1 }
    case 'se': return { x: x + 1, y: y - 1, z }
    case 's': return { x, y: y - 1, z: z + 1 }
    case 'sw': return { x: x - 1, y, z: z + 1 }
    case 'nw': return { x: x - 1, y: y + 1, z }
  }
}

const getDistance = ({ x, y, z }) =>
  Math.max(Math.abs(x), Math.abs(y), Math.abs(z))

const getFinalCoords = steps =>
  steps.reduce(step, { x: 0, y: 0, z: 0 })

const getMaxDistance = steps =>
  steps.reduce((acc, direction) => {
    const newPos = step(acc, direction)
    return Object.assign(newPos, {
      max: Math.max(acc.max, getDistance(newPos))
    })
  }, { x: 0, y: 0, z: 0, max: 0 }).max

const solvePart = {
  // Part 1: Return the shortest distance to a resulting tile
  1: compose(getDistance, getFinalCoords),

  // Part 2: Return the max distance from the origin traveled
  2: getMaxDistance
}

module.exports = (part, input) =>
  solvePart[part](input.split(','))
module.exports.puzzleName = 'Day 11 - Hex Ed'
