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

  // CLI

  //  Current
  
  console.log(
    'Current Time:',
    format(
      addSeconds(
        new Date(1970, 0, 1-1, 12+2+5, 0, 0),
        forecastDataObj.currently.time
      ),
      'h:mm bbb'
    )
  );
  console.log('Todays Forecast:',forecastDataObj.currently.summary);
  console.log('Current Temperature:',forecastDataObj.currently.temperature);
  console.log('Icon:',forecastDataObj.currently.icon,'\n');

  //  Daily

  forecastDataObj.daily.data.forEach(element => {
    console.log(
      'Day:',
      format(
        addSeconds(
          new Date(1970, 0, 1, 12+2, 0, 0),
          element.time
        ),
        'MMMM dd, yyyy'
      )
    );
    console.log('Weather:',element.summary);
    console.log('Icon:',element.icon);
    console.log('High:',element.temperatureHigh);
    console.log('Low:',element.temperatureLow,'\n');
  });

  // Webpage

  //  Current

  //  Daily

  // Acknowledgement

  console.log('This application is powered by the OpenCage API and the Dark Sky API\n')
  console.log('https://opencagedata.com/api')
  console.log('https://darksky.net/dev\n\n')


};

//if(program.city != '') {

//forecastDataObj = run(program.city);
run(program.city);
//console.log(forecastDataObj);
//} else {
//  return null;
//
