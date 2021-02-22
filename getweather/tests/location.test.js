const nock = require('nock');
const { getLocation } = require('../location');

describe('location connection', () => {
  let openCage;
  let openCageQuery = {
    key: process.env.OPENCAGE_KEY
  };

  afterAll(() => {
    nock.restore();
  });

  beforeEach(() => {
    nock.disableNetConnect();
    nock.enableNetConnect(/^(127\.0\.0\.1|localhost)/);
    openCage = nock(process.env.OPENCAGE_URL);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  test('location string is sent properly', async () => {
    openCage
      .get('/json')
      .query({
        ...openCageQuery,
        q: 'Orlando,FL,USA',
        limit: 1,
      })
      .reply(200, { hello: 'test' });

    const response = await getLocation('Orlando,FL,USA');
    const responseObj = JSON.parse(response);

    expect(responseObj.hello).toBe('test');
  });

  test("A validly formed request for a reachable location will return one result", async () => {
//    nock.recorder.rec();
    openCage
      .get('/json')
      .query({
        ...openCageQuery,
        q: 'Miami,FL,USA',
        limit: 1,
      })
      .reply(200, { results: ['test'] });

    const response = await getLocation('Miami,FL,USA');
    const responseObj = JSON.parse(response);
  
    expect(responseObj.results.length).toBe(1);
//    nock.recorder.play();
  });

  test("A validly formed request for an unreachable location will return zero results", async () => {
    openCage
      .get('/json')
      .query({
        ...openCageQuery,
        q: 'nowhere-interesting',
        limit: 1,
      })
      .reply(200, { results: [] });

    const response = await getLocation('nowhere-interesting');
    const responseObj = JSON.parse(response);
    
    expect(responseObj.results.length).toBe(0);
  });
});
