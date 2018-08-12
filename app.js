const app = require('express')();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect('mongodb://localhost/proj');

require('./server/config/express')(app);
require('./server/config/routes')(app);