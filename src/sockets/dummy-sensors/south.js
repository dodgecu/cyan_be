const south = {
  package_id: 2,
  name: 'South package',
  sensors: {
    temperature: 67,
    humidity: 43,
    soilMoisture: { 'Sensor data': '69' },
    light: '76',
    time: new Date().getTime()
  }
};

module.exports = south;
