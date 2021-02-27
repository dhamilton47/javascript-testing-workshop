require('dotenv').config();
const addSeconds = require('date-fns/addSeconds');
const format = require('date-fns/format');
const program = require('commander');
const { getLocation } = require('./location');
const { getWeather } = require('./weather');
const nock = require('nock');
const { OPENCAGE_KEY, OPENCAGE_URL } = process.env;


program.option('-c, --city <string>', 'what is your city');
program.parse(process.argv);

if(!process.argv.slice(2).length) {
  program.outputHelp();
  process.exit();
}

// Application below

const run = async city => {

  // get location coordinates
  try {
    const cityData = await getLocation(city, OPENCAGE_URL, OPENCAGE_KEY);
    const cityDataObj = JSON.parse(cityData).results[0];
    const { lat, lng } = cityDataObj.geometry;
    console.log(lat, lng);
    //return lat, lng;
  } catch (e) {
    console.log('Error in the OpenCage API call.');
  }
  //let forecastDataObj;
  // get forecast data
  /*
  try {
    const forecastData = await getWeather(lat, lng);
    forecastDataObj = JSON.parse(forecastData);
    //return forecastDataObj;
  } catch (e) {
    console.log('Error in the DarkSky API call.')
  }
  return forecastDataObj;
};
*/
};
//if(program.city != '') {

//forecastDataObj = run(program.city);
run(program.city);
//console.log(forecastDataObj);
//} else {
//  return null;
//
