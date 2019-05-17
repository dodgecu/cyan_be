// Configure server
const express = require('express');
const app = express();
const config = require('config');
const http = require('http').Server(app);
const cors = require('cors');

// db
const mongoose = require('mongoose');

// Import routes
const flowerRoute = require('./src/routes/flower');
const flowerSensors = require('./src/routes/flower-sensors');

// DB config
const db = config.get('mongoURI');

//connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('mongoDB connected...'))
  .catch(err => console.log(err));

// CORS
// CORS
app.use(cors());
app.options('*', cors());

// ROUTERS
app.use(express.json());

app.use(flowerRoute);

app.use(flowerSensors);

//users route
app.use('/api/items', require('./src/routes/api/items'));
app.use('/api/users', require('./src/routes/api/users'));
app.use('/api/auth', require('./src/routes/api/auth'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.info(`Server running on port ${PORT}`));
