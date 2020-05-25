const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Korisnik = require('../models/Korisnik');
const Kontakt = require('../models/Kontakt');

// @route   GET api/kontakti
// @desc    Zemi gi site kontakti od korisnikot
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const kontakti = await Kontakt.find({ user: req.korisnik.id }).sort({
      date: -1,
    });
    res.json(kontakti);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/kontakti
// @desc    Dodaj nov kontakt
// @access  Private
router.post(
  '/',
  [auth, [check('name', 'Името е потребно').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
      const novKontakt = new Kontakt({
        name,
        email,
        phone,
        type,
        user: req.korisnik.id,
      });

      const kontakt = await novKontakt.save();

      res.json(kontakt);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/kontakti/:id
// @desc    Azuriraj kontakt
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  // Bildame objekt od kontaktot
  const kontaktPolinja = {};
  if (name) kontaktPolinja.name = name;
  if (email) kontaktPolinja.email = email;
  if (phone) kontaktPolinja.phone = phone;
  if (type) kontaktPolinja.type = type;

  try {
    let kontakt = await Kontakt.findById(req.params.id);

    if (!kontakt)
      return res.status(404).json({ msg: 'Контактот не е пронајден' });

    // ovde se osiguruvame dali korisnikot go poseduva kontaktot
    if (kontakt.user.toString() !== req.korisnik.id) {
      return res.status(401).json({ msg: 'Не сте авторизирани' });
    }

    kontakt = await Kontakt.findByIdAndUpdate(
      req.params.id,
      { $set: kontaktPolinja },
      { new: true }
    );

    res.json(kontakt);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/kontakti/:id
// @desc    Izbrisi kontakt
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let kontakt = await Kontakt.findById(req.params.id);

    if (!kontakt)
      return res.status(404).json({ msg: 'Контактот не е пронајден' });

    // ovde se osiguruvame dali korisnikot go poseduva kontaktot
    if (kontakt.user.toString() !== req.korisnik.id) {
      return res.status(401).json({ msg: 'Не сте авторизирани' });
    }

    await Kontakt.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Контактот е отстранет' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
