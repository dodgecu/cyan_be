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
  const startTime = parseFloat(req.params.time) + 86400000;
  const stopTime = parseFloat(req.params.time);
  const convertedTime = {
    "$add": [new Date(0), "$time"]
  };

  FlowerSensorModel.aggregate([{
      $match: {
        package_id: id,
        'sensors.time': {
          $gte: stopTime.toString(),
          $lt: startTime.toString()
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
        waterHumidity: '$humidity',
        hour: {
          $hour: convertedTime
        }
      }
    }, {
      $group: {
        _id: '$hour',
        avgHumidity: {
          $avg: "$waterHumidity"
        }
      }
    }, {
      $project: {
        _id: 0,
        hour: '$_id',
        humidity: '$avgHumidity'
      }
    }
  ])
    .then((sensorData) => res.json(sensorData));
});

//GET flower's packages light data
router.get('/flower-sensor/:id/light/:time', (req, res) => {
  const id = req.params.id;
  const startTime = parseFloat(req.params.time) + 86400000;
  const stopTime = req.params.time;

  FlowerSensorModel.find({
    package_id: id,
    'sensors.time': {
      $lt: startTime
    }
  })

});

//GET flower's packages air data
router.get('/flower-sensor/:id/air/:time', (req, res) => {
  const id = req.params.id;
  const startTime = parseFloat(req.params.time) + 86400000;
  const stopTime = req.params.time;

  FlowerSensorModel.find({
    package_id: id,
    'sensors.time': {
      $lt: startTime
    }
  })

});

module.exports = router;
