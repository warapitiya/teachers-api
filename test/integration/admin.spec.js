/**
 * Created by warapitiya on 4/13/18.
 */

const request = require('supertest');
describe('admin endpoint', () => {
  let server;
  beforeEach(() => {
    server = require('../../config/express');
  });
  it('should get all registered students', (done) => {
    request(server)
      .get('/api/admin/registeredstudents')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('should register students for a teacher', (done) => {
    request(server)
      .post('/api/admin/register')
      .send({
        teacher: 'teacherken@gmail.com',
        students:
          [
            'studentjon@example.com',
            'studentryan@example.com'
          ]
      })
      .expect(204, done);
  });

  it('should get common students for teachers', (done) => {
    request(server)
      .get('/api/admin/commonstudents?teachers=teacherken@gmail.com,shea1985@hotmail.com')
      .expect(200, done);
  });

  it('should suspend a student', (done) => {
    request(server)
      .post('/api/admin/suspend')
      .send({
        student: 'shea1985@hotmail.com'
      })
      .expect(204, done);
  });

  it('should retrieve for notifications', (done) => {
    request(server)
      .post('/api/admin/retrievefornotifications')
      .send({
        teacher: 'teacherken@gmail.com',
        notification: 'Hello students! @studentagnes@example.com @studentmiche@example.com'
      })
      .expect(200, done);
  });

});
