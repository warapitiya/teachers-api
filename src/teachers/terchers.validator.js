/**
 * Created by warapitiya on 4/15/18.
 */
const Joi = require('joi');

module.exports = {
  createTeacher: {
    body: {
      email: Joi.string().email().required()
    }
  }
};
