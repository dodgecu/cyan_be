const FlowerModel = require('../models/flower.model');
const express = require('express');

const router = express.Router();

// POST
router.post('/flower', (req, res) => {
  if (!('package_id' in req.body)) {
    req.body['package_id'] = '';
  }
  const model = new FlowerModel(req.body);

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
router.get('/user-flowers', (req, res) => {
  if (!req.query.id) {
    return res.status(400).send('Missing flower id param');
  }
  FlowerModel.find({ user_id: req.query.id })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// GET
router.get('/flower-id', (req, res) => {
  if (!req.query.id) {
    return res.status(400).send('Missing flower id param');
  }
  FlowerModel.find({ _id: req.query.id })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// UPDATE
router.put('/flower', (req, res) => {
  if (!req.query.email) {
    return res.status(400).send('Missing URL param: email');
  }
  FlowerModel.findOneAndUpdate(
    {
      email: req.query.email
    },
    req.body,
    {
      new: true
    }
  )
    .then(doc => res.json(doc))
    .catch(err => res.status(500).json(err));
});

// DELETE
router.delete('/flower', (req, res) => {
  if (!req.query.email) {
    return res.status(400).send('Missing URL param: email');
  }
  FlowerModel.findOneAndRemove({
    email: req.query.email
  })
    .then(doc => res.json(doc))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
