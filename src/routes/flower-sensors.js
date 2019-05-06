const FlowerSensorModel = require('../models/flower-sensor.model');
const express = require('express');
const moment = require('moment');

const router = express.Router();

// POST
router.post('/packages', (req, res) => {
  if (!req.body) {
    return res.status(400).send('Request body missing');
  }
  const model = new FlowerSensorModel(req.body);
  model
    .save()
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500);
      }
      res.status(201).send(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// GET
router.get('/flower-sensors', (req, res) => {
  FlowerSensorModel.find()
    .sort({
      _id: -1
    })
    .limit(1)
    .then(doc => res.json(doc))
    .catch(err => err);
});

// UPDATE
router.put('/flower-sensors', (req, res) => {});

// DELETE
router.delete('/flower-sensors', (req, res) => {});


//GET flower's packeges water data
router.get('/flower-sensor/:id/water/:time', (req, res) => {
  const id = parseFloat(req.params.id);
  const time = req.params.time;
  const stopTime = parseFloat(time) + 86400000;
  const startTime = parseFloat(req.params.time);
  const convertedTime = {
    "$add": [new Date(0), "$time"]
  };

  FlowerSensorModel.aggregate([{
      $match: {
        package_id: id,
        'sensors.time': {
          $gte: startTime.toString(),
          $lt: stopTime.toString()
        }
      }
    }, {
      $project: {
        soilMoisture: {
          $toDouble: "$sensors.soilMoisture.Sensor data"
        },
        time: {
          $toDouble: "$sensors.time"
        }
      }
    }, {
      $project: {
        _id: 0,
        soilMoisture: '$soilMoisture',
        hour: {
          $hour: convertedTime
        }
      }
    }, {
      $group: {
        _id: '$hour',
        avgSoilMoisture: {
          $avg: "$soilMoisture"
        }
      }
    }, {
      $project: {
        _id: 0,
        hour: '$_id',
        soilMoisture: '$avgSoilMoisture'
      }
    }
  ])
    .then((sensorData) => res.json(sensorData));
});

//GET flower's packeges water data
router.get('/flower-sensor/:id/humidity/:time', (req, res) => {
  const id = parseFloat(req.params.id);
  const time = req.params.time;
  const stopTime = parseFloat(time) + 86400000;
  const startTime = parseFloat(req.params.time);
  const convertedTime = {
    "$add": [new Date(0), "$time"]
  };

  FlowerSensorModel.aggregate([{
      $match: {
        package_id: id,
        'sensors.time': {
          $gte: startTime.toString(),
          $lt: stopTime.toString()
        }
      }
    }, {
      $project: {
        humidity: {
          $toDouble: "$sensors.humidity"
        },
        time: {
          $toDouble: "$sensors.time"
        }
      }
    }, {
      $project: {
        _id: 0,
        humidity: '$humidity',
        hour: {
          $hour: convertedTime
        }
      }
    }, {
      $group: {
        _id: '$hour',
        avgHumidity: {
          $avg: "$humidity"
        }
      }
    }, {
      $project: {
        _id: 0,
        hour: '$_id',
        soilMoisture: '$avgHumidity'
      }
    }
  ])
    .then((sensorData) => res.json(sensorData));
});

//GET flower's packeges water data
router.get('/flower-sensor/:id/temperature/:time', (req, res) => {
  const id = parseFloat(req.params.id);
  const time = req.params.time;
  const stopTime = parseFloat(time) + 86400000;
  const startTime = parseFloat(req.params.time);
  const convertedTime = {
    "$add": [new Date(0), "$time"]
  };

  FlowerSensorModel.aggregate([{
      $match: {
        package_id: id,
        'sensors.time': {
          $gte: startTime.toString(),
          $lt: stopTime.toString()
        }
      }
    }, {
      $project: {
        temperature: {
          $toDouble: "$sensors.temperature"
        },
        time: {
          $toDouble: "$sensors.time"
        }
      }
    }, {
      $project: {
        _id: 0,
        temperature: '$temperature',
        hour: {
          $hour: convertedTime
        }
      }
    }, {
      $group: {
        _id: '$hour',
        avgTemperature: {
          $avg: "$temperature"
        }
      }
    }, {
      $project: {
        _id: 0,
        hour: '$_id',
        temperature: '$avgTemperature'
      }
    }
  ])
    .then((sensorData) => res.json(sensorData));
});

module.exports = router;
