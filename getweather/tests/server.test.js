require('jest');
const rp = require('request-promise');
const { app, server } = require('../server');

describe('Server', () => {
  it('returns 200 status and correct body content.', async () => {
    const response = await rp({
      uri: 'http://localhost:3000/',
      resolveWithFullResponse: true
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toBe('Hello world!');

    server.close();
  });
});