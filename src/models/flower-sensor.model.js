const mongoose = require('mongoose');

mongoose.connect(
  `mongodb+srv://dodgecu:sn5s692@dodgecu-kuaps.mongodb.net/test?retryWrites=true`
);

const FlowerSensorSchema = new mongoose.Schema({
  temperature: String,
  humidity: String,
  soilMoisture: Object,
  light: String,
  time: Number
});

module.exports = mongoose.model('FlowerSensors', FlowerSensorSchema);
