/**
 * Day 8 - I Heard You Like Registers
 *
 * Evaluate a mini language.
 */

const { max, values } = require('../util')

/**
 * Convert a line to a relatively simple AST. AST directly inspired by esprima:
 *   esprima.parse('if (a > 5) b -= 3')
 */
const parseLine = line => {
  const match = line.trim().match(/^(\w+) (inc|dec) (-?)(\d+) if (\w+) (<|>|<=|>=|==|!=) (-?)(\d+)$/)
  return {
    type: 'IfStatement',
    test: {
      type: 'BinaryExpression',
      operator: match[6],
      left: {
        type: 'Identifier',
        name: match[5]
      },
      right: {
        type: 'Literal',
        value: Number(match[7] + match[8])
      }
    },
    consequent: {
      type: 'ExpressionStatement',
      expression: {
        type: 'CallExpression',
        expression: {
          type: 'AssignmentExpression',
          operator: match[2],
          left: {
            type: 'Identifier',
            name: match[1]
          },
          right: {
            type: 'Literal',
            value: Number(match[3] + match[4])
          }
        }
      }
    }
  }
}

const parseProgram = input => ({
  type: 'Program',
  body: input.split('\n').map(parseLine)
})

const traverseAst = (ast, v) => {
  const traverse = (node) => {
    if (Array.isArray(node)) {
      node.forEach(traverse)
      return
    }
    switch (node.type) {
      case 'Program':
        traverse(node.body)
        break

      case 'IfStatement':
        traverse(node.test)
        traverse(node.consequent)
        break

      case 'AssignmentExpression':
      case 'BinaryExpression':
        traverse(node.left)
        traverse(node.right)
        break

      case 'ExpressionStatement':
        traverse(node.expression)
        break

      case 'CallExpression':
        traverse(node.expression)
        break

      case 'Literal':
      case 'Identifier':
        break
    }

    if (node.type in v) {
      v[node.type](node)
    }
  }

  traverse(ast)
}

const evalProgram = (input) => {
  const symbolTable = {}
  const ast = parseProgram(input)
  const queue = []
  let maxValue = 0
  traverseAst(ast, {
    Identifier (node) {
      symbolTable[node.name] = symbolTable[node.name] || 0
    },
    BinaryExpression (node) {
      switch (node.operator) {
        case '>':
          queue.push(symbolTable[node.left.name] > node.right.value)
          break
        case '<':
          queue.push(symbolTable[node.left.name] < node.right.value)
          break
        case '>=':
          queue.push(symbolTable[node.left.name] >= node.right.value)
          break
        case '<=':
          queue.push(symbolTable[node.left.name] <= node.right.value)
          break
        case '==':
          queue.push(symbolTable[node.left.name] === node.right.value)
          break
        case '!=':
          queue.push(symbolTable[node.left.name] !== node.right.value)
          break
      }
    },
    AssignmentExpression (node) {
      queue.push({
        [node.left.name]: node.operator === 'inc'
          ? symbolTable[node.left.name] + node.right.value
          : symbolTable[node.left.name] - node.right.value
      })
    },
    IfStatement (node) {
      const test = queue.shift()
      const update = queue.shift()
      if (test) {
        Object.assign(symbolTable, update)
        const currentMax = max(values(symbolTable))
        if (currentMax > maxValue) {
          maxValue = currentMax
        }
      }
    }
  })
  return { symbolTable, maxValue }
}

const solvePart = {
  // Part 1. Return the largest resulting variable value after evaluating the
  // program.
  1: (input) => max(values(evalProgram(input).symbolTable)),

  // Part 2: Return the largest value that any variable ever was after
  // evaluating the program.
  2: (input) => evalProgram(input).maxValue
}

module.exports = (part, input) =>
  solvePart[part](input)
module.exports.puzzleName = 'Day 8 - I Heard You Like Registers'
