require('dotenv').config()
const program = require('commander')
//const { getLocation } = require('./location')
program.option('-c, --city <string>', 'what is your city')
//program.option('-s, --state <string>', 'what is your state')
//program.option('-C, --country <string>', 'what is your country')
program.parse(process.argv)

if(!process.argv.slice(2).length) {
    program.outputHelp()
    process.exit()
}

// Application below
// console.log(process.argv)
// console.log(program.city)
//console.log(program.state)
//console.log(program.country)
/*
const run = async (city) => {
    try {
        const cityData = await getLocation(city)
//        console.log(cityData)
    } catch(e) {
        console.error(e)
    }
}
*/
//console.log(program.city)
if(program.city != '') {
    console.log(program.city)
//    run(program.city)
}
