const program = require('commander');
const { hello } = require('./hello');

program.option('-n, --name <string>', 'what is your name');
program.parse(process.argv);

// Application below

const run = name => {
  console.log(hello(name));
};
 
if(program.name != '') {
  run(program.name);
}
