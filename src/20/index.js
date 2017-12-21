/**
 * Day 20 - Particle Swarm
 *
 * Particle movement.
 */

const parseLine = (line, id) => {
  const match = line.match(/-?\d+/g)
  return {
    id,
    position: {
      x: Number(match[0]),
      y: Number(match[1]),
      z: Number(match[2])
    },
    velocity: {
      x: Number(match[3]),
      y: Number(match[4]),
      z: Number(match[5])
    },
    acceleration: {
      x: Number(match[6]),
      y: Number(match[7]),
      z: Number(match[8])
    }
  }
}

const tick = p => ({
  id: p.id,
  position: {
    x: p.acceleration.x + p.velocity.x + p.position.x,
    y: p.acceleration.y + p.velocity.y + p.position.y,
    z: p.acceleration.z + p.velocity.z + p.position.z
  },
  velocity: {
    x: p.acceleration.x + p.velocity.x,
    y: p.acceleration.y + p.velocity.y,
    z: p.acceleration.z + p.velocity.z
  },
  acceleration: p.acceleration
})

const tickTimes = (n, p) => {
  let acc = p
  for (let i = 0; i < n; i += 1) {
    acc = tick(acc)
  }
  return acc
}

const getDistance = ({ position: { x, y, z } }) =>
  Math.abs(x) + Math.abs(y) + Math.abs(z)

const filterCollisions = particles => {
  const seen = particles.reduce((acc, { position: { x, y, z } }) => {
    const key = `${x},${y},${z}`
    acc[key] = (acc[key] || 0) + 1
    return acc
  }, {})
  return particles.filter(({ position: { x, y, z } }) => seen[`${x},${y},${z}`] === 1)
}

const solvePart = {
  // Part 1: Return which particle remains closest to the origin over time.
  // Solution brute forced.
  1: (particles, n) =>
    particles.reduce((acc, p) => {
      const dA = getDistance(tickTimes(n, acc))
      const dB = getDistance(tickTimes(n, p))
      return dA < dB ? acc : p
    }).id,

  // Part 2: Return the number of particles that remain after collisions are
  // removed. Solution brute forced.
  2: (particles, n) => {
    let i = 0
    while (i < n) {
      particles = filterCollisions(particles.map(tick))
      i += 1
    }
    return particles.length
  }
}

module.exports = (part, input, n = 1000) =>
  solvePart[part](input.trim().split('\n').map(parseLine))
module.exports.puzzleName = 'Day 20 - Particle Swarm'
