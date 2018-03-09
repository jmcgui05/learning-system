//basic server setup
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const courseRoutes = require('./routes/courseRoutes.js');
const config = require('../config');

//connect to db
const mongoose = require('mongoose');
mongoose.Promise = global.Promise; //temp fix for mongoose promise deprecation warning
mongoose.connect(config.url);

// use body parser to parse requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

//set port to env or 8080
const port = process.env.PORT || 8080;

//setup routes
// const router = express.Router();

//test route
app.get('/api', ( req, res) => {
    res.json({
        message: 'Welcome to the Learning Application!'
    });
});

//use the imported routes
app.use('/api', courseRoutes);

//start the server and log
app.listen(port);
console.log('Learning server listening on %s', port);
