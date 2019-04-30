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

function postData(data) {
  if (data !== null) {
    axios.post('http://localhost:4000/packages', data).then(north => {
      socket_io.emit('clientEvent', north.data);
    });
  } else {
    socket_io.emit('clientEvent', 'error');
  }
}

module.exports = sensorData;
