const express = require('express');
const router = express.Router();

// @route   GET api/kontakti
// @desc    Zemi gi site kontakti od korisnikot
// @access  Private
router.get('/', (req, res) => {
  res.send('Zemi gi site kontakti od korisnikot');
});

// @route   POST api/kontakti
// @desc    Dodaj nov kontakt
// @access  Private
router.post('/', (req, res) => {
  res.send('Dodaj nov kontakt');
});

// @route   PUT api/kontakti/:id
// @desc    Azuriraj kontakt
// @access  Private
router.put('/:id', (req, res) => {
  res.send('Azuriraj kontakt');
});

// @route   DELETE api/kontakti/:id
// @desc    Izbrisi kontakt
// @access  Private
router.delete('/:id', (req, res) => {
  res.send('Izbrisi kontakt');
});

module.exports = router;
