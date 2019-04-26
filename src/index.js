const express = require('express');
const app = express();
const cors = require('cors');

const http = require('http').Server(app);

const PORT = process.env.PORT || 4000;

const bodyParser = require('body-parser');

const flowerRoute = require('./routes/flower');
const flowerSensors = require('./routes/flower-sensors');

const sensors = require('./sockets/sensors-data');

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
);

app.use(bodyParser.json());

app.use(flowerRoute);

app.use(flowerSensors);

app.listen(PORT, () => console.info(`Server running on port ${PORT}`));
