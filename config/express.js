const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const logger = require('morgan');
const helmet = require('helmet');
const expressValidation = require('express-validation');
const config = require('./config');
const routes = require('../index.routes');

const app = express();

if (config.env === 'development') {
  app.use(logger('dev'));
}

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(compress());
app.use(cookieParser());

// secure apps by setting various HTTP headers
app.use(helmet());

// mount all routes on /api path
app.use('/api', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = config.env === 'development' ? err : {};

  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors.map(error => error.messages.join('. ')).join(' and ');
    res.status(400).json({
      status: err.status,
      error: unifiedErrorMessage
    });
  } else {
    // render the error page
    res.status(err.status || 500);
    res.json({status: err.status || 500, message: 'Route is not valid'});
  }
});

module.exports = app;
