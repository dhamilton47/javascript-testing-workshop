const program = require('commander')

program.option('-n, --name <string>', 'what is your name')
program.parse(process.argv)

console.log(program.name)
