const io = require('socket.io-client');
const axios = require('axios');
const socket_io = require('socket.io').listen(1335);

const socket = io.connect('http://cyan:8080/', {
  reconnection: false
});

const sensorData = socket.on('connect', () => {
  console.log('connected to cyan:8080');
  socket.on('clientEvent', data => {
    postData(data);
  });
});

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

function postData(data) {
  if (data !== null) {
    axios
      .post('http://localhost:4000/packages', data)
      .then(north => {
        socket_io.emit('clientEvent', north.data);
      })
      .then(data => socket_io.emit('southPackage', south))
      .then(data => socket_io.emit('westPackage', west))
      .then(data => socket_io.emit('eastPackage', east));
  } else {
    socket_io.emit('clientEvent', 'error');
  }
}

module.exports = sensorData;
