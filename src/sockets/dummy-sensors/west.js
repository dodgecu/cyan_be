const west = {
  package_id: 3,
  name: 'West package',
  sensors: {
    temperature: 57,
    humidity: 33,
    soilMoisture: { 'Sensor data': '39' },
    light: '56',
    time: new Date().getTime()
  }
};

module.exports = west;
