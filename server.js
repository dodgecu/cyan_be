const express = require('express');
const mongoose = require('mongoose');
const app = express();
const config = require('config');
const cors = require('cors');

app.use(express.json());
app.use(cors());

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

app.use('/api/items', require('./routes/api/items'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));


const port = 5000;

app.listen(port, () => console.log(`Server started on ${port}`));
