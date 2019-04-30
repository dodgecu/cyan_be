const mongoose = require('mongoose');

const FlowerSensorSchema = new mongoose.Schema({
  temperature: String,
  humidity: String,
  soilMoisture: Object,
  light: String,
  time: Number
});

const packageName = new mongoose.Schema({
  package_id: Number,
  name: String,
  sensors: FlowerSensorSchema,
  package_id: Number,
  name: String,
  sensors: FlowerSensorSchema,
  package_id: Number,
  name: String,
  sensors: FlowerSensorSchema,
  package_id: Number,
  name: String,
  sensors: FlowerSensorSchema
});

const package = new mongoose.Schema({
  north: packageName,
  southPackage: packageName,
  eastPackage: packageName,
  westPackage: packageName
});

module.exports = mongoose.model('package', package);
