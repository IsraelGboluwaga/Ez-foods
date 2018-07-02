const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');

require('dotenv').config();
const app = express();

//Set db connection
const mongoose_options = {useMongoClient: true};
if (!process.env.NODE_ENV === 'production' && !app.get('env') === 'production') {
    mongoose.connect(process.env.DB_URL, mongoose_options);
} else {
    mongoose.connect(process.env.DB_URL_LIVE, mongoose_options);
}
mongoose.Promise = global.Promise;
const db_connection = mongoose.connection;
db_connection.on('error', console.error.bind(console, 'MongoDB connection error: '));


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

    // render the error message
    res.status(err.status || 500);
    res.json('error');
});

const port = process.env.PORT || 8500;

app.listen(port, () => {
    console.log('App listening on port', port);
});

module.exports = app;