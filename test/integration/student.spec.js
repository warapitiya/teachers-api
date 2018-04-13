/**
 * Created by warapitiya on 4/13/18.
 */

const request = require('supertest');
describe('student endpoint', () => {
  let server;
  beforeEach(() => {
    server = require('../../config/express');
  });
  it('should get all students', (done) => {
    request(server)
      .get('/api/student')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

});
