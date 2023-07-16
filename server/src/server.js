const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./routes/dbConn');
const { logError } = require('./middleware/errorHandler');
require('dotenv').config();

const routes = require('./routes');

connectDB();

app.use(express.json({ limit: '50mb' }));
app.use(cors());

app.use('/', routes);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(3000, () => console.log('Server listening at port 3000'));
});

app.use(logError);

process.on('uncaughtException', (err) => {
  console.log(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

process.on('unhandledRejection', (err, promise) => {
  console.log('Unhandled rejection at ', promise, `reason: ${err.message}`);
  process.exit(1);
});
