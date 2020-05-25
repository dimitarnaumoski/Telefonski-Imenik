const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Korisnik = require('../models/Korisnik');

// @route   POST api/korisnici
// @desc    Registriraj korisnik
// @access  Public
router.post(
  '/',
  [
    check('name', 'Ве молиме внесете име').not().isEmpty(),
    check('email', 'Ве молиме внесте валидна адреса').isEmail(),
    check(
      'password',
      'Ве молиме внесете лозинка со 6 или повеќе карактери'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let korisnik = await Korisnik.findOne({ email }); // metod na mongoose

      if (korisnik) {
        return res.status(400).json({ msg: 'Корисникот веќе постои' });
      }

      korisnik = new Korisnik({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      korisnik.password = await bcrypt.hash(password, salt); // Hashiranje na passwordot

      await korisnik.save();

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
          expiresIn: 36000,
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
