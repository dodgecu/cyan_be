const io = require('socket.io-client');
const axios = require('axios');
const socket_io = require('socket.io').listen(1335);

const southPackage = require('../packages/south-package');
const eastPackage = require('../packages/east-package');
const westPackage = require('../packages/west-package');

const socket = io.connect('http://cyan:8080/', {
  reconnection: false
});

const sensorData = socket.on('connect', () => {
  console.log('connected to cyan:8080');
  socket.on('clientEvent', data => {
    postData(data);
  });
});

function postData(north) {
  const data = {
    north,
    southPackage,
    eastPackage,
    westPackage
  };
  console.log(data);

  if (north !== null) {
    axios.post('http://localhost:4000/packages', data).then(north => {
      socket_io.emit('clientEvent', north.data);
    });
  } else {
    socket_io.emit('clientEvent', 'error');
  }
}

module.exports = sensorData;
