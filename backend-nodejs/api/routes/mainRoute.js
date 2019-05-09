'use strict';
const express = require('express');
const app = express();

// imports routes
const authRoutes = require('./authRoute');
const usersRoutes = require('./usersRoute');
//const tasksRoutes = require('');
const transactionsRoutes = require('./transactionsRoute');

// set routes in application
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/transactions', transactionsRoutes);

app.use('*', (req, res) => {
  res.boom.notFound(); // Responds with a 404 status code
});

module.exports = app;
