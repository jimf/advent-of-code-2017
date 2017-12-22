const test = require('tape')
const solve = require('./')

test(solve.puzzleName, t => {
  const input = `
../.# => ##./#../...
.#./..#/### => #..#/..../..../#..#
`.trim()

  t.equal(solve(1, input, 2), 12)
  t.end()
})

// test(`${solve.puzzleName} (part 2)`, t => {
//   const input = `
// p=<-6,0,0>, v=< 3,0,0>, a=< 0,0,0>
// p=<-4,0,0>, v=< 2,0,0>, a=< 0,0,0>
// p=<-2,0,0>, v=< 1,0,0>, a=< 0,0,0>
// p=< 3,0,0>, v=<-1,0,0>, a=< 0,0,0>
// `.trim()

//   t.equal(solve(2, input), 1)
//   t.end()
// })
