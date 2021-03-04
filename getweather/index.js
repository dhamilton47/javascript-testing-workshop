require('dotenv').config();
const program = require('commander');
const { getLocation } = require('./location');
const { getWeather } = require('./weather');
const { outputToConsole } = require("./outputToConsole");
const { OPENCAGE_KEY, OPENCAGE_URL } = process.env;


program
  .version('0.0.1')
  .requiredOption('-c, --city <string>', 'what is your city')
  .option('-o, --output <string>', 'currently, forecast or both?', 'forecast')
  .parse(process.argv);

if(!program.opts().city) {
  program.outputHelp();
  process.exit();
}

// Application below

const run = async (city, output) => {
  let  coordinates, forecastDataObj, dontOutputWhat;

  // get location coordinates

  try {
    const cityData = await getLocation(city, OPENCAGE_URL, OPENCAGE_KEY);
    coordinates = JSON.parse(cityData).results[0].geometry;
    cityFormated = JSON.parse(cityData).results[0].formatted;
  } catch (e) {
    console.log('Error in the OpenCage API call.');
    return;
  }

  if(output == 'both') {
    dontOutputWhat = '';
  } else if (output == 'currently') {
    dontOutputWhat = 'daily,';
  } else {
    dontOutputWhat = 'currently,';
  }

  coordinates['dontOutputWhat'] = dontOutputWhat;

  // get forecast data

  try {
    const forecastData = await getWeather(coordinates);
    forecastDataObj = JSON.parse(forecastData);
  } catch (e) {
    console.log('Error in the DarkSky API call.');
    return;
  }

  // Format results

  outputToConsole(cityFormated, forecastDataObj, output);
};

if(program.opts().city != '') {
  run(program.opts().city, program.opts().output);
}
