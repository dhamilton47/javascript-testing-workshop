const nock = require('nock');
const { getLocation } = require('../location');
const defaultOptions = require('./helpers/nock');
const { OPENCAGE_KEY, OPENCAGE_URL } = process.env;
const location = 'Orlando,FL,USA';
const locationFormatted = 'Orlando, Florida, United States of America';

/*
  What needs to be tested?
    Making a connection - 200, OK
    Limiting responses to one - 200, OK, limit=1 parameter
    How to handle zero responses - 200, OK, throw error noLocationError location not found
    How to respond to errors and the impact on the overall application
*/

describe('location connection', () => {
  afterAll(() => nock.restore());
  afterEach(() => nock.cleanAll());

  test('location string is sent properly', async () => {
    nock.back.setMode('record');

    const { nockDone } = await nock.back(
      'location-good.json',
      defaultOptions,
    );

    const response = await getLocation(location, OPENCAGE_URL, OPENCAGE_KEY);
    const responseObj = JSON.parse(response);

    expect(responseObj).toEqual(
      expect.objectContaining({
        results: expect.arrayContaining(
          [
            expect.objectContaining({
              "formatted": locationFormatted,
            }),
          ]
        ),
        status: {
          "code": 200,
          "message": "OK"
        },
        total_results: expect.any(Number),
      }),
    );
    
    nockDone();
    nock.back.setMode('wild');
  });

  test('A validly formed request for a reachable location will return one result', async () => {
    nock.back.setMode('record');

    const { nockDone } = await nock.back(
      'location-good.json',
      defaultOptions,
    );
    const response = await getLocation(location, OPENCAGE_URL, OPENCAGE_KEY);
    const responseObj = JSON.parse(response);

    expect(responseObj).toEqual(
      expect.objectContaining({
        results: expect.arrayContaining(
          [
            expect.objectContaining({
              "formatted": locationFormatted,
            }),
          ]
        ),
        status: {
          "code": 200,
          "message": "OK"
        },
        total_results: 1,
      }),
    );

    nockDone();
    nock.back.setMode('wild');
  });

  test('A validly formed request for an unreachable location will return zero results', async () => {
    nock.back.setMode('record');

    const { nockDone } = await nock.back(
      'location-nowhere.json',
      defaultOptions,
    );
 
    const response = await getLocation('nowhere-interesting', OPENCAGE_URL, OPENCAGE_KEY);
    const responseObj = JSON.parse(response);

    expect(responseObj).toEqual(
      expect.objectContaining({
        results: expect.any(Object),
        status: {
          "code": 200,
          "message": "OK"
        },
        total_results: 0,
      }),
    );

    nockDone();
    nock.back.setMode('wild');
  });
});

describe('OpenCage API Errors', () => {
  afterAll(() => nock.restore());
  afterEach(() => nock.cleanAll());

  test('a missing query will return a 400 error', async () => {
    nock.back.setMode('record');

    const { nockDone } = await nock.back(
      'missing_location.json',
      defaultOptions,
    );

    const response = await getLocation('', OPENCAGE_URL, OPENCAGE_KEY);
    const responseObj = JSON.parse(response);

    expect(responseObj).toEqual(
      expect.objectContaining({
        results: [],
        status: {
          "code": 400,
          "message": "missing or bad query"
        },
        total_results: 0,
      }),
    );

    nockDone();
    nock.back.setMode('wild');
  });

  test('a bad API key will return a 401 error', async () => {
    nock.back.setMode('record');

    const { nockDone } = await nock.back(
      'bad_api_key.json',
      defaultOptions,
    );
 
    const response = await getLocation(location, OPENCAGE_URL, 'bad_key');
    const responseObj = JSON.parse(response);

    expect(responseObj).toEqual(
      expect.objectContaining({
        results: [],
        status: {
          "code": 401,
          "message": "invalid API key"
        },
        total_results: 0,
      }),
    );

    nockDone();
    nock.back.setMode('wild');
  });
});