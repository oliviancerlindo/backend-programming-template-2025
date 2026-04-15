require('dotenv').config();
require('express-async-errors');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./api/routes');
const { seedPrizes } = require('./utils/seed');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', routes);

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;
const { DB_CONNECTION } = process.env;
const { DB_NAME } = process.env;

mongoose
  .connect(DB_CONNECTION, { dbName: DB_NAME })
  .then(async () => {
    console.log('Connected to MongoDB');
    await seedPrizes();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });
