const inquirer = require('inquirer')
const aocSolutions = {
  '01': require('./src/01'),
  '02': require('./src/02'),
  '03': require('./src/03')
}

inquirer.prompt([
  {
    type: 'list',
    name: 'day',
    message: 'Which day would you like to solve?',
    choices: [
      {
        name: 'Day 1 - Inverse Captcha',
        value: '01'
      },
      {
        name: 'Day 2 - Corruption Checksum',
        value: '02'
      },
      {
        name: 'Day 3 - Spiral Memory',
        value: '03'
      }
    ]
  },
  {
    type: 'list',
    name: 'part',
    message: 'Part?',
    choices: [{ name: 'Part 1', value: 1 }, { name: 'Part 2', value: 2 }]
  },
  {
    type: 'input',
    name: 'input',
    message: 'Puzzle input:'
  }
])
  .then((answers) => {
    console.log('Running solution...')
    console.log('> ', aocSolutions[answers.day](answers.part, answers.input))
  })
  .catch((err) => { console.error(err) })
