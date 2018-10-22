const express = require('express');
const app = express();

app.use(require('./sensores'));
app.use(require('./variables'));

module.exports = app;