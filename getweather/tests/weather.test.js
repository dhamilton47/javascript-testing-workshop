const nock = require('nock');
const { getWeather } = require('../weather');
const defaultOptions = require('./helpers/nock');

describe('weather connection', () => {
  afterAll(() => nock.restore());
  afterEach(() => nock.cleanAll());

  test('request sent properly', async () => {
    nock.back.setMode('record');

    const { nockDone } = await nock.back(
      'weather-good.json',
      defaultOptions,
    );

    const response = await getWeather({lat: 28.5421109, lng: -81.3790304});
    const responseObj = JSON.parse(response);

    expect(responseObj).toEqual(
      expect.objectContaining({
        currently: expect.objectContaining({
          "time": expect.any(Number),
          "summary": expect.any(String),
          "icon": expect.any(String),
          "temperature": expect.any(Number),
        }),
        
        daily: {
          "summary": expect.any(String),
          "icon": expect.any(String),
          "data": expect.arrayContaining([
            expect.any(Object),
            expect.any(Object),
            expect.any(Object),
            expect.any(Object),
            expect.any(Object),
            expect.any(Object),
            expect.any(Object),
            expect.any(Object),
          ]),
        },
      }),
    );
    
    nockDone();
    nock.back.setMode('wild');
  });
});
