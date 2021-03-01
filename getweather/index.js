require('dotenv').config();
const program = require('commander');
const { getLocation } = require('./location');
const { getWeather } = require('./weather');
const nock = require('nock');
const { outputToConsole } = require("./outputToConsole");
const { OPENCAGE_KEY, OPENCAGE_URL } = process.env;


program.option('-c, --city <string>', 'what is your city');
program.parse(process.argv);

if(!process.argv.slice(2).length) {
  program.outputHelp();
  process.exit();
}

// Application below

const run = async city => {
  let  coordinates, forecastDataObj;

  // get location coordinates

  try {
    const cityData = await getLocation(city, OPENCAGE_URL, OPENCAGE_KEY);
    coordinates = JSON.parse(cityData).results[0].geometry;
  } catch (e) {
    console.log('Error in the OpenCage API call.');
    return;
  }

  // get forecast data
  
  try {
    const forecastData = await getWeather(coordinates);
    forecastDataObj = JSON.parse(forecastData);
  } catch (e) {
    console.log('Error in the DarkSky API call.');
    return;
  }

  // Format results

  outputToConsole(forecastDataObj);


  // Webpage

  //  Current

  //  Daily

};

//if(program.city != '') {

//forecastDataObj = run(program.city);
run(program.city);


