/**
 * Created by warapitiya on 4/13/18.
 */
const request = require('supertest');
describe('route health', () => {
  let server;
  beforeEach(() => {
    server = require('../../config/express');
  });
  it('responds to /api/health-check', (done) => {
    request(server)
      .get('/api/health-check')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

});
