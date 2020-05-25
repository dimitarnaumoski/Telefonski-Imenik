const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Korisnik = require('../models/Korisnik');

// @route   GET api/auth
// @desc    Get logiran korisnik
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const korisnik = await Korisnik.findById(req.korisnik.id).select(
      '-password'
    ); // mongoose method shto vrakja promes
    res.json(korisnik);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/auth
// @desc    Avtenticiraj korisnik & zemi token
// @access  Public
router.post(
  '/',
  [
    check('email', 'Ве молиме внесете валидна адреса').isEmail(),
    check('password', 'Потребен е пасворд').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let korisnik = await Korisnik.findOne({ email });

      if (!korisnik) {
        return res.status(400).json({ msg: 'Невалидно' });
      }

      const isMatch = await bcrypt.compare(password, korisnik.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Невалидно' });
      }

      const payload = {
        // objektot koj go prakame vo token
        korisnik: {
          id: korisnik.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
