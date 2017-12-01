const inquirer = require('inquirer')
const aocSolutions = {
  '01': require('./src/01')
}

inquirer.prompt([
  {
    type: 'list',
    name: 'run',
    message: 'Which solution would you like to run?',
    choices: [
      {
        name: 'Day 1 - Inverse Captcha',
        value: '01p1'
      },
      {
        name: 'Day 1 - Inverse Captcha (part 2)',
        value: '01p2'
      }
    ]
  },
  {
    type: 'input',
    name: 'input',
    message: 'Puzzle input:'
  }
])
  .then((answers) => {
    const [day, part] = answers.run.split('p')
    console.log('Running solution...')
    console.log('> ', aocSolutions[day](Number(part), answers.input))
  })
  .catch((err) => { console.error(err) })
