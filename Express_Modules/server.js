// import express from 'express';
// import router from './routes/routes.js';
// import logger from './utilities/utilities.js';

const express = require('express');
const router = require('./routes/routes.js');
const logger = require('./utilities/utilities.js');

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(logger);
app.use('/api', router);

app.get('/', (req, res) => {
    res.send("Welcome to the Express Modules API!");
});

app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});