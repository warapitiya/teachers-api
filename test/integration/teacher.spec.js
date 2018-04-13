/**
 * Created by warapitiya on 4/13/18.
 */

const request = require('supertest');
describe('teacher endpoint', () => {
  let server;
  beforeEach(() => {
    server = require('../../config/express');
  });

  it('should get all teachers', (done) => {
    request(server)
      .get('/api/teacher')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('should get teacher by email', (done) => {
    request(server)
      .get('/api/teacher?emails=TinaRAmes@rhyta.com')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('should get teachers by emails', (done) => {
    request(server)
      .get('/api/teacher?emails=TinaRAmes@rhyta.com,LeoEMartin@armyspy.com')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('should add new teacher', (done) => {
    const random = Math.floor(Math.random() * 99) + 1;
    request(server)
      .post('/api/teacher')
      .send({
        email: `william${random}@hotmail.com`
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(201, done);
  });
});
