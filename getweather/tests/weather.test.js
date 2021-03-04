const nock = require('nock');
const { getWeather } = require('../weather');
const defaultOptions = require('./helpers/nock');

describe('Weather connection', () => {
  afterAll(() => nock.restore());
  afterEach(() => nock.cleanAll());

  test('request for current conditions sent properly.', async () => {
    nock.back.setMode('record');

    const weatherInput = {
      lat: 28.5421109,
      lng: -81.3790304,
      dontOutputWhat: 'daily,'
    };
    
    const { nockDone } = await nock.back(
      'weather-current-good.json',
      defaultOptions,
    );

    const response = await getWeather(weatherInput);
    const responseObj = JSON.parse(response);

    expect(responseObj).toEqual(
      expect.objectContaining({
        currently: expect.objectContaining({
          "time": expect.any(Number),
          "summary": expect.any(String),
          "temperature": expect.any(Number),
        }),
      }),
    );
      
    expect(responseObj).not.toEqual(
      expect.objectContaining({
        daily: expect.objectContaining({
          "summary": expect.any(String),
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
        }),
      }),
    );
    
    nockDone();
    nock.back.setMode('wild');
  });

  test('request for forecast sent properly.', async () => {
    nock.back.setMode('record');

    const weatherInput = {
      lat: 28.5421109,
      lng: -81.3790304,
      dontOutputWhat: 'currently,'
    };
    
    const { nockDone } = await nock.back(
      'weather-forecast-good.json',
      defaultOptions,
    );

    const response = await getWeather(weatherInput);
    const responseObj = JSON.parse(response);

    expect(responseObj).toEqual(
      expect.objectContaining({
        daily: expect.objectContaining({
          "summary": expect.any(String),
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
        }),
      }),
    );

    expect(responseObj).not.toEqual(
      expect.objectContaining({
        currently: expect.objectContaining({
          "time": expect.any(Number),
          "summary": expect.any(String),
          "temperature": expect.any(Number),
        }),
      }),
    );
   nockDone();
    nock.back.setMode('wild');
  });
  
  test('request for forecast sent properly.', async () => {
    nock.back.setMode('record');

    const weatherInput = {
      lat: 28.5421109,
      lng: -81.3790304,
      dontOutputWhat: ''
    };
    
    const { nockDone } = await nock.back(
      'weather-good.json',
      defaultOptions,
    );

    const response = await getWeather(weatherInput);
    const responseObj = JSON.parse(response);

    expect(responseObj).toEqual(
      expect.objectContaining({
        currently: expect.objectContaining({
          "time": expect.any(Number),
          "summary": expect.any(String),
          "temperature": expect.any(Number),
        }),
        daily: expect.objectContaining({
          "summary": expect.any(String),
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
        }),
      }),
    );

    nockDone();
    nock.back.setMode('wild');
  });
});
