require('jest');
const { EOL } = require('os');
const cmd = require('./helpers/cmd');
const nock = require('nock');
const defaultOptions = require('./helpers/nock');

describe('env conf works', () => {
  test('it works', () => {
    expect(process.env.TESTING).toBe('TRUE');
  });
});

describe('The Weather CLI', () => {
  test('test on return states.', async () => {
    
    //returning an error
    
    let response = await cmd.execute('../getweather/index.js', ['-c', 'nowhere-interesting']);
    
    let responseError = false;

    if(response == '' || response == 'Error in the OpenCage API call.\n' || response == 'Error in the DarkSky API call.\n') {
      responseError = !responseError;
    }

    expect(responseError).toEqual(true);

    // returning without an error
    
    response = await cmd.execute('../getweather/index.js', ['-c', 'Orlando,FL,USA']);
    
    responseError = false;

    if(response == '' || response == 'Error in the OpenCage API call.\n' || response == 'Error in the DarkSky API call.\n') {
      responseError = !responseError;
    }

    expect(responseError).toEqual(false);
  });
})
