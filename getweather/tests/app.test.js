require('jest');
const request = require('supertest');
const { app } = require('../app');

describe('Server', () => {
  it('returns 200 status and correct body content.', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello world!');
  });
});