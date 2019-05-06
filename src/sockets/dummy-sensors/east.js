const east = {
  package_id: 4,
  name: 'East package',
  sensors: {
    temperature: 47,
    humidity: 53,
    soilMoisture: { 'Sensor data': '49' },
    light: '76',
    time: new Date().getTime()
  }
};
module.exports = east;
