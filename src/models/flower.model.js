const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

require('mongoose-uuid2')(mongoose);
const UUID = mongoose.Types.UUID;

// mongoose.connect(
//   `mongodb+srv://dodgecu:sn5s692@dodgecu-kuaps.mongodb.net/test?retryWrites=true`
// );

const FlowerSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  airHumidity: Number,
  airTemperature: Number,
  flowerSelect: String,
  light: Number,
  name: String,
  soilHumidity: Number
});

module.exports = mongoose.model('Flower', FlowerSchema);
