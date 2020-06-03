const express = require('express');
require('express-async-errors');
const cors = require('cors');
const routes = require('./routes');
const logger = require('./logs/logger');
require('./database/connection');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err, req, res, next) => {
    logger.error(err);

    return res.status(500).json({ message: 'An unexpected error has occured, please try again later' });
});


module.exports = app;