const mongoose = require('mongoose');


// mongoose.connect(
//   `mongodb+srv://dodgecu:sn5s692@dodgecu-kuaps.mongodb.net/test?retryWrites=true`
// );

const FlowerSchema = new mongoose.Schema({
  airHumidity: Number,
  airTemperature: Number,
  type: String,
  light: Number,
  name: String,
  soilHumidity: Number,
  id: Number
});

module.exports = mongoose.model('Flower', FlowerSchema);
