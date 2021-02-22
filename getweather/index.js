require('dotenv').config();
const addSeconds = require('date-fns/addSeconds');
const format = require('date-fns/format');
const program = require('commander');
const { getLocation } = require('./location');
const { getWeather } = require('./weather');
const nock = require('nock');


program.option('-c, --city <string>', 'what is your city');
program.parse(process.argv);

if(!process.argv.slice(2).length) {
  program.outputHelp();
  process.exit();
}

// Application below

const run = async (city) => {

  try {
//nock.recorder.rec()
    // get location coordinates
    const cityData = await getLocation(city);

    const cityDataObj = JSON.parse(cityData).results[0];

    const { lat, lng } = cityDataObj.geometry
    
    // get forecast data
    const forecastData = await getWeather(lat, lng);

    const forecastDataObj = JSON.parse(forecastData);

    // Format results
   
    //Current
    // CLI
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

    // Webpage
    
    //Daily
    // CLI
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


    // Acknowledgement
//nock.recorder.play()
    console.log('This application is powered by the OpenCage API and the Dark Sky API\n')
    console.log('https://opencagedata.com/api')
    console.log('https://darksky.net/dev\n\n')
  } catch(e) {
    console.error(e);
  }
}

//if(program.city != '') {
  //  console.log(program.city);
 run(program.city);
  //console.log(coordinates);
  //let coordinatesObj = JSON.parse(coordinates).results[0].geometry;

  //console.log(coordinatesObj);
   
//} else {
//  return null;
//}
