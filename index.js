const inquirer = require('inquirer')
const aocSolutions = {
  '01p1': require('./src/01/p1')
}

inquirer.prompt([
  {
    type: 'list',
    name: 'run',
    message: 'Which solution would you like to run?',
    choices: [
      {
        name: 'Day 1: PROBLEM NAME HERE',
        value: '01p1'
      }
    ]
  }
]).then(({ run }) => {
  const solve = aocSolutions[run]
  return inquirer.prompt(solve.prompt).then(answers => {
    console.log('Running solution...')
    const args = Object.keys(answers).reduce((acc, key) => (
      [...acc, answers[key]]
    ), [])
    console.log('> ', solve(...args))
  })
})
.catch((err) => { console.error(err) })
