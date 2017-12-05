/**
 * Day 5 - A Maze of Twisty Trampolines, All Alike
 *
 * Jump instructions. Move around in a list of jump instructions, using the
 * values at each location as the delta for the next jump. Update the previous
 * location using a set of rules. Continue until the index is out of bounds and
 * return the number of jumps that were made.
 */

const runJumps = (updaterFn, jumps) => {
  let regA = 0
  let regB = 0
  let moves = 0
  let done = false

  while (!done) {
    regA += jumps[regA]
    jumps[regB] = updaterFn(jumps[regB])
    regB = regA
    moves += 1
    done = regA < 0 || regA > jumps.length - 1
  }

  return moves
}

const solvePart = {
  // Part 1: Always increment by 1
  1: x => x + 1,

  // Part 2: Decrease by 1 if the current value is >= 3. Otherwise decrement 1
  2: x => x >= 3 ? x - 1 : x + 1
}

module.exports = (part, input) =>
  runJumps(solvePart[part], input.trim().split('\n').map(Number))
module.exports.puzzleName = 'Day 5 - A Maze of Twisty Trampolines, All Alike'
