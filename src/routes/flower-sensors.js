const FlowerSensorModel = require('../models/flower-sensor.model');
const express = require('express');

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
    .sort({ _id: -1 })
    .limit(1)
    .then(doc => res.json(doc))
    .catch(err => err);
});

// UPDATE
router.put('/flower-sensors', (req, res) => {});

// DELETE
router.delete('/flower-sensors', (req, res) => {});


//GET flower's packeges data
router.get('/flower-sensor/:id/:time', (req, res) => {
  const id = req.params.id;
  const time = req.params.time;
})

module.exports = router;
