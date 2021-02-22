require('jest');
const { EOL } = require('os');
const cmd = require('./cmd');
const nock = require('nock');
const defaultOptions = require('./helpers/nock');

describe('env conf works', () => {
  test('it works', () => {
    expect(process.env.TESTING).toBe('TRUE');
  });
});

describe('The Weather CLI', () => {
  test('returns a 7-day forecast', async () => {
    // nock.recorder.rec();

    nock.back.setMode('record');
    
    const { nockDone } = await nock.back(
      'user-data.json',
      defaultOptions,
    );

    const response = await cmd.execute(
      '../getweather/index.js',
      ['-c', 'Orlando']
    );
    console.log(response);
    // const responseObj = JSON.parse(response);

    expect(response).toEqual(
      expect.objectContaining({
        results: expect.any(Object),
      }),
    );

    nockDone();
    nock.back.setMode('wild');
    // nock.recorder.play();
  });
})
