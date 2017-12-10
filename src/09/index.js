/**
 * Day 9 - Stream Processing
 *
 * Grammar parser. Parse lines of encapsulated groups. Groups begin and with
 * opening/closing curly braces, and may contain "junk" or other groups,
 * separated by commas. Junk is encapsulated in "<" and ">". "!" characters
 * found within "junk" are considered escape characters, giving zero meaning
 * to the immediate next character.
 */
const { sumWith } = require('../util')

class Token {
  constructor (type, value, col) {
    this.type = type
    this.value = value
    this.col = col
  }
}

class Lexer {
  constructor (input) {
    this.input = input
    this.pos = 0
  }

  nextToken () {
    if (this.pos >= this.input.length) {
      return new Token('EndOfInput')
    }

    const c = this.input.charAt(this.pos)
    switch (true) {
      case c === '{' || c === '}': return this.handleCurly()
      case c === '<': return this.handleJunk()
      case c === ',': return this.handleSeparator()
    }
  }

  handleCurly () {
    const pos = this.pos
    const c = this.input.charAt(pos)
    this.pos += 1
    return c === '{'
      ? new Token('OpenCurly', '{', pos)
      : new Token('CloseCurly', '}', pos)
  }

  handleJunk () {
    let junk = ''
    let pos = this.pos

    while (pos < this.input.length) {
      const c = this.input.charAt(pos)
      const lookahead = pos + 1 < this.input.length
        ? this.input.charAt(pos + 1)
        : null

      junk += c
      pos += 1

      if (c === '>') { break }
      if (c === '!' && lookahead !== null) {
        junk += lookahead
        pos += 1
      }
    }

    this.pos += junk.length

    return new Token('Junk', junk, pos)
  }

  handleSeparator () {
    const pos = this.pos
    this.pos += 1
    return new Token('Separator', ',', pos)
  }

  allTokens () {
    const tokens = []
    let token = this.nextToken()

    while (token.type !== 'EndOfInput') {
      tokens.push(token)
      token = this.nextToken()
    }

    return tokens
  }
}

function parse (tokens) {
  let pos = 0

  const walk = () => {
    let token = tokens[pos]

    if (token.type === 'OpenCurly') {
      pos += 1
      token = tokens[pos]

      const node = {
        type: 'Group',
        children: []
      }

      while (token.type !== 'CloseCurly') {
        node.children.push(walk())
        token = tokens[pos]
      }

      pos += 1
      return node
    }
  }

  return walk()
}

const scoreGroupDepth = (d, node) =>
  d + sumWith(scoreGroupDepth.bind(null, d + 1))(node.children)

const solvePart = {
  // Part 1: Return the sum the depth levels of each group
  1: sumWith((line) =>
      scoreGroupDepth(1, parse(
        (new Lexer(line))
          .allTokens()
          .filter(token => token.type.includes('Curly'))
      ))
    ),

  // Return the total length of unescaped junk
  2: sumWith((line) =>
      (new Lexer(line))
        .allTokens()
        .filter(token => token.type === 'Junk')
        .map(t => t.value.slice(1, -1))
        .join('')
        .replace(/!./g, '')
        .length
    )
}

module.exports = (part, input) =>
  solvePart[part](input.trim().split('\n'))
module.exports.puzzleName = 'Day 9 - Stream Processing'
