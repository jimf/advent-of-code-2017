/**
 * Day 3 - Spiral Memory
 *
 * Create a grid of squares, starting with square 1, which is at the center,
 * and spiral out, with 2 to the immediate right and going counter clockwise.
 * For part 1, return the Manhattan distance of a given square from square 1.
 * In part 2, assign values to the squares which are equal to the sum of the
 * known values of the square's 8 neighbors. Square 1 has a value of 1.
 */

const fsm = require('../fsm')

const directionFsm = initial =>
  fsm({
    initial,
    states: {
      right: { TURN: 'up' },
      up: { TURN: 'left' },
      left: { TURN: 'down' },
      down: { TURN: 'right' }
    }
  })

const moveFsm = () =>
  fsm({
    initial: 'move0',
    states: {
      move0: { MOVE: 'move1' },
      move1: { MOVE: 'move0' }
    }
  })

/**
 * How spiraling works: The number of steps "forward" to take is a pattern:
 * 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, and so on. When n number of steps have been
 * taken, turn. Repeat.
 */
const runSpiralUntil = pred => {
  // Init state.
  const direction = directionFsm('right')
  const move = moveFsm()
  let currentSquare = 1
  let x = 0
  let y = 0
  let stepsPerMove = 1
  let stepsTaken = 0

  // Loop until the given predicate returns true based on current state.
  while (!pred({ x, y, value: currentSquare })) {
    // Update state.
    currentSquare += 1
    stepsTaken += 1
    switch (direction.getState()) {
      case 'right':
        x += 1
        break

      case 'up':
        y += 1
        break

      case 'left':
        x -= 1
        break

      case 'down':
        y -= 1
        break
    }

    // Check for special cases. Could this part be encapsulated by another fsm?
    if (stepsTaken === stepsPerMove) {
      move.dispatch('MOVE')
      direction.dispatch('TURN')
      stepsTaken = 0
      if (move.getState() === 'move0') {
        stepsPerMove += 1
      }
    }
  }

  return { x, y }
}

const getManhattanDistance = (p1, p2) =>
  Math.abs(p2.x - p1.x) + Math.abs(p2.y - p1.y)

const getNeighbors = ({ x, y }) =>
  [
    { x: x - 1, y: y + 1 },
    { x, y: y + 1 },
    { x: x + 1, y: y + 1 },
    { x: x - 1, y },
    { x: x + 1, y },
    { x: x - 1, y: y - 1 },
    { x, y: y - 1 },
    { x: x + 1, y: y - 1 }
  ]

const pointToKey = ({ x, y }) => `${x},${y}`

const solvePart = {
  /**
   * In part 1, spiral until the given square is found and return the Manhattan
   * distance.
   */
  1: (square) => {
    let x
    let y
    runSpiralUntil((state) => {
      x = state.x
      y = state.y
      return state.value === square
    })
    return getManhattanDistance({ x: 0, y: 0 }, { x, y })
  },

  /**
   * In part 2, spiral until the calculated value is greater than the given
   * input.
   */
  2: (input) => {
    const values = { '0,0': 1 }
    let val = 1
    runSpiralUntil((state) => {
      if (state.value === 1) { return false } // Special case to skip the known value
      const key = pointToKey(state)
      values[key] = val = getNeighbors(state).reduce(
        (acc, p) => acc + (values[pointToKey(p)] || 0),
        0
      )
      return values[key] > input
    })
    return val
  }
}

module.exports = (part, input) =>
  solvePart[part](Number(input))
