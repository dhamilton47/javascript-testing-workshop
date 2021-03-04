const addSeconds = require('date-fns/addSeconds');
const format = require('date-fns/format');
const terminalLink = require('terminal-link');


function outputToConsole(city, forecastDataObj, output) {
  if(output == 'currently' || output == 'both') {
    console.log('\nThe current weather for', city);
    console.log(
      '\nCurrent Time:',
      format(
        addSeconds(
          new Date(1970, 0, 1 - 1, 12 + 2 + 5, 0, 0),
          forecastDataObj.currently.time
        ),
        'h:mm bbb'
      )
    );
    console.log('Todays Forecast:', forecastDataObj.currently.summary);
    console.log('Current Temperature: %i', Math.round(forecastDataObj.currently.temperature,'\n'));
  }
  

  //  Daily
  if(output == 'forecast' || output == 'both') {
    console.log('\nThe forecast weather for', city);
    forecastDataObj.daily.data.forEach(element => {
      console.log(
        '\nDay:',
        format(
          addSeconds(
            new Date(1970, 0, 1, 0, 0, 0),
            element.time
          ),
          'eeee, MMMM dd, yyyy'
        )
      );
      console.log('Weather:', element.summary);
      console.log('High: %i', Math.round(element.temperatureHigh));
      console.log('Low:  %i', Math.round(element.temperatureLow), '\n');
    });
  }

  // Acknowledgement
  const linkDarkSky = terminalLink('Powered by Dark Sky', 'https://darksky.net/dev');
  const linkOpenCage = terminalLink('Powered by OpenCage', 'https://opencagedata.com/api');
  console.log(linkDarkSky);
  console.log(linkOpenCage);
}
exports.outputToConsole = outputToConsole;
