const mongoose = require('mongoose');

// mongoose.connect(
//   `mongodb+srv://dodgecu:sn5s692@dodgecu-kuaps.mongodb.net/test?retryWrites=true`
// );

const FlowerSensorSchema = new mongoose.Schema({
  temperature: String,
  humidity: String,
  soilMoisture: Object,
  light: String,
  time: Number
});

const package = new mongoose.Schema({
  package_id: Number,
  sensors: FlowerSensorSchema
});

module.exports = mongoose.model('package', package);
