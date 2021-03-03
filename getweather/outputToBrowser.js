const addSeconds = require('date-fns/addSeconds');
const format = require('date-fns/format');

function outputToConsole(forecastDataObj) {
  console.log(
    'Current Time:',
    format(
      addSeconds(
        new Date(1970, 0, 1 - 1, 12 + 2 + 5, 0, 0),
        forecastDataObj.currently.time
      ),
      'h:mm bbb'
    )
  );
  console.log('Todays Forecast:', forecastDataObj.currently.summary);
  console.log('Current Temperature:', forecastDataObj.currently.temperature);
  console.log('Icon:', forecastDataObj.currently.icon, '\n');

  //  Daily
  forecastDataObj.daily.data.forEach(element => {
    console.log(
      'Day:',
      format(
        addSeconds(
          new Date(1970, 0, 1, 12 + 2, 0, 0),
          element.time
        ),
        'MMMM dd, yyyy'
      )
    );
    console.log('Weather:', element.summary);
    console.log('Icon:', element.icon);
    console.log('High:', element.temperatureHigh);
    console.log('Low:', element.temperatureLow, '\n');
  });

  // Acknowledgement
  console.log('This application is powered by the OpenCage API and the Dark Sky API\n');
  console.log('https://opencagedata.com/api');
  console.log('https://darksky.net/dev\n\n');
}
exports.outputToConsole = outputToConsole;
