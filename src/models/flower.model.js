const mongoose = require('mongoose');

const FlowerSchema = new mongoose.Schema({
  airHumidity: Number,
  airTemperature: Number,
  type: String,
  light: Number,
  name: String,
  soilHumidity: Number,
  package_id: String
});

module.exports = mongoose.model('Flower', FlowerSchema);
