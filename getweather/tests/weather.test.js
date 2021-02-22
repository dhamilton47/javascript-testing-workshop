const nock = require('nock');
const { getWeather } = require('../weather');

describe('weather connection', () => {
  let darkSky;
  let darkSkyKey = {
    key: process.env.DARKSKY_KEY
  };
  
  afterAll(() => {
    nock.restore();
  });

  beforeEach(() => {
    nock.disableNetConnect();
    nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/);
    darkSky = nock(process.env.DARKSKY_URL);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  test('coordinates are sent properly', async () => {
    darkSky.get(`/${darkSkyKey.key}/0,0?exclude=minutely,hourly,alerts,flags`)
      .reply(200, { hello: 'test'});

    const response = await getWeather(0,0);
    const responseObj = JSON.parse(response);

    expect(responseObj.hello).toBe('test');
  });
});
