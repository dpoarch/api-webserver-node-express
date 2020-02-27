const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

const encodeRoutes = require('./api/routes/encodeRoute');

app.use(cors());

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api', encodeRoutes);

app.use((req, res, next)=>{
    const error = new Error('Not Found xxxxx');
    error.status = 404;
    next(error);

});

app.use((error, req, res, next)=>{
    res.error = error.status || 500;
    res.json({error : {message: error.message}});
});

module.exports = app;