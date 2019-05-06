const io = require('socket.io-client');
const axios = require('axios');
const socket_io = require('socket.io').listen(1335);

const south = require('./dummy-sensors/south');
const east = require('./dummy-sensors/east');
const west = require('./dummy-sensors/west');

const socket = io.connect('http://cyan:8080/', {
  reconnection: false
});

const sensorData = socket.on('connect', () => {
  console.log('connected to cyan:8080');
  socket.on('clientEvent', data => {
    postData(data);
  });
});

function postData(data) {
  if (data.sensors) {
    axios
      .post('http://localhost:4000/packages', data)
      .then(north => {
        socket_io.emit('clientEvent', north.data);
      })
      .then(data => socket_io.emit('southPackage', south))
      .then(data => socket_io.emit('westPackage', west))
      .then(data => socket_io.emit('eastPackage', east));
  } else {
    socket_io.emit('clientEvent', data);
  }
}

module.exports = sensorData;
