const inquirer = require('inquirer')
const aocSolutions = {
  '01': require('./src/01'),
  '02': require('./src/02'),
  '03': require('./src/03'),
  '04': require('./src/04'),
  '05': require('./src/05'),
  '06': require('./src/06'),
  '07': require('./src/07'),
  '08': require('./src/08'),
  '09': require('./src/09'),
  '10': require('./src/10'),
  '11': require('./src/11'),
  '12': require('./src/12'),
  '13': require('./src/13'),
  '14': require('./src/14'),
  '15': require('./src/15'),
  '16': require('./src/16'),
  '17': require('./src/17'),
  '18': require('./src/18'),
  '19': require('./src/19'),
  '20': require('./src/20'),
  '21': require('./src/21'),
  '22': require('./src/22'),
  '23': require('./src/23'),
  '24': require('./src/24'),
  '25': require('./src/25')
}

inquirer.prompt([
  {
    type: 'list',
    name: 'day',
    message: 'Which day would you like to solve?',
    choices: Object.keys(aocSolutions).map((key) => ({
      name: aocSolutions[key].puzzleName,
      value: key
    }))
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
