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
  console.log(north);
  if (!north === null) {
    axios
      .post('http://localhost:4000/packages', north)
      .then(north => socket_io.emit('clientEvent', north.data))
      .catch(northError => socket_io.emit('clientEvent', northError))
      .then(
        axios
          .post('http://localhost:4000/packages', southPackage)
          .then(south => socket_io.emit('clientEvent', south.data))
      )
      .catch(southError => socket_io.emit('clientEvent', southError))
      .then(
        axios
          .post('http://localhost:4000/packages', eastPackage)
          .then(east => socket_io.emit('clientEvent', east.data))
      )
      .catch(eastError => socket_io.emit('clientEvent', eastError))
      .then(
        axios
          .post('http://localhost:4000/packages', westPackage)
          .then(west => socket_io.emit('clientEvent', west.data))
      )
      .catch(westError => socket_io.emit('clientEvent', westError));
  } else {
    socket_io.emit('clientEvent', 'error');
  }
}

module.exports = sensorData;
