const express = require('express');
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

function postData(sensors) {
  console.log(sensors);
  if (sensors === null) {
    console.log('error');
  } else {
    axios
      .post('http://localhost:4000/flower-sensors', sensors)
      .then(res => {
        socket_io.emit('clientEvent', res.data);
      })
      .catch(err => console.log(err));
  }
}

module.exports = sensorData;
