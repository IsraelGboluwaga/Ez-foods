const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');

const app = express();
require('dotenv').config();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const appRoutes = require('./routes');
app.use('*', appRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

const port = process.env.PORT || 3500;

app.listen(port, () => {
    console.log('App listening on port', port);
});

module.exports = app;