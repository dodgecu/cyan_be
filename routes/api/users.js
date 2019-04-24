const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

//User Model
const User = require('../../models/user');

//@route POST api/users
router.post('/', (req, res) => {
  const {
    name,
    email,
    password
  } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: 'Enter all fields'
    });
  }

  User.findOne({ email })
    .then(user => {
      if (user) {
        res.status(400).json({
          message: 'User already exists'
        });
      }

      const newUser = new User({
        name,
        email,
        password
      });

      // Create salt & hash
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => {

              jwt.sign(
                { id: user.id },
                config.get('JWT'),
                { expiresIn: 3600 },
                (err, token) => {
                  if(err) throw err;

                  res.json({
                    token,
                    user: {
                      id: user.id,
                      name: user.name,
                      email: user.email
                    }
                  });

                }
              );

            });
        });
      });
    });
});

module.exports = router;
