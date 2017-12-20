/**
 * Day 19 - A Series of Tubes
 *
 * Path following.
 */

const isLetter = c => /[A-Z]/.test(c)
const isEmpty = c => c === null || c === ' '

const lookup = lines => (row, col) =>
  (row >= 0 && row < lines.length && col >= 0 && col < lines[row].length)
    ? lines[row].charAt(col)
    : null

const walkLine = lines => (f, startRow, startCol, direction) => {
  let row = startRow
  let col = startCol
  const deltaMap = {
    up: [-1, 0],
    down: [1, 0],
    left: [0, -1],
    right: [0, 1]
  }
  const delta = deltaMap[direction]

  while (!isEmpty(lookup(lines)(row, col))) {
    f([row, col])
    row += delta[0]
    col += delta[1]
  }
}

const getLine = lines => (row, col, direction) => {
  const result = []
  walkLine(lines)(([r, c]) => {
    result.push({ row: r, col: c, value: lookup(lines)(r, c), direction })
  }, row, col, direction)
  return result
}

const isEndLine = line =>
  line[line.length - 1].value !== '+'

const isLineSeen = (line, seen) =>
  line.some(({ value }) => isLetter(value) && !!seen[value])

const solvePath = (lines) => {
  const path = []
  const seen = {}
  const look = lookup(lines)

  const solve = (row, col, dir) => {
    const line = getLine(lines)(row, col, dir)
    const { row: endRow, col: endCol } = line[line.length - 1]
    if (isEndLine(line)) {
      path.push(line)
      return true
    }
    if (isLineSeen(line, seen)) { return false }

    line.forEach(({ value }) => {
      if (isLetter(value)) {
        seen[value] = true
      }
    })

    if (dir === 'up' || dir === 'down') {
      if (!isEmpty(look(endRow, endCol - 1)) && solve(endRow, endCol - 1, 'left')) {
        path.push(line)
        return true
      } else if (!isEmpty(look(endRow, endCol + 1)) && solve(endRow, endCol + 1, 'right')) {
        path.push(line)
        return true
      }
    } else {
      if (!isEmpty(look(endRow - 1, endCol)) && solve(endRow - 1, endCol, 'up')) {
        path.push(line)
        return true
      } else if (!isEmpty(look(endRow + 1, endCol)) && solve(endRow + 1, endCol, 'down')) {
        path.push(line)
        return true
      }
    }

    return false
  }

  if (solve(0, lines[0].indexOf('|'), 'down')) {
    path.reverse()
    return [].concat.apply([], path)
  }
}

const solvePart = {
  // Part 1: Walk the path and return, in order, the letters that were
  // encountered.
  1: (lines) =>
    solvePath(lines)
      .filter(({ value }) => isLetter(value))
      .reduce((acc, { value }) => acc + value, ''),

  // Part 2: Walk the path and return the number of steps taken.
  2: (lines) => solvePath(lines).length
}

module.exports = (part, input) =>
  solvePart[part](input.split('\n'))
module.exports.puzzleName = 'Day 19 - A Series of Tubes'
