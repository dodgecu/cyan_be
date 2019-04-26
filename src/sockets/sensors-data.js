const express = require('express');
const io = require('socket.io-client');
const axios = require('axios');

const socket = io.connect('http://cyan:8080/', {
  reconnection: true
});

const sensorData = socket.on('connect', () => {
  console.log('connected to cyan:8080');
  socket.on('clientEvent', data => {
    postData(data);
  });
});

function postData(sensors) {
  axios
    .post('http://localhost:4000/flower-sensors', sensors)
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
}

module.exports = sensorData;
