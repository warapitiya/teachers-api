/**
 * Created by warapitiya on 4/15/18.
 */

const Joi = require('joi');

module.exports = {
  registerValidator: {
    body: {
      teacher: Joi.string().email().required(),
      students: Joi.array().items(Joi.string().email()).required()
    }
  },

  commonStudentsValidator: {
    query: {
      teachers: Joi.string().required()
    }
  },

  suspendValidator: {
    body: {
      student: Joi.string().email().required()
    }
  },

  notificationsValidator: {
    body: {
      teacher: Joi.string().email().required(),
      notification: Joi.string().required()
    }
  }
};
