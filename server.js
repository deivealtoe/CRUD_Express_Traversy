// Node import's
const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');

const server = express()


// Body parser middleware
server.use(express.json());
server.use(express.urlencoded({ extended: false }));


// Setting up a middleware - logger
server.use(logger);


// Setting a static folder for HTML files to be sent
server.use(express.static(path.join(__dirname, '_htmls')));


// Members API routes
server.use('/api/members', require('./routes/api/members'));


// Starting the express server
const PORT = 3000;
const HOST = "0.0.0.0";

server.listen(PORT, HOST, () => {
    console.log(`Serving on port ${PORT}`);
});