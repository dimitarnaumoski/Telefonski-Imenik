const express = require('express');
const router = express.Router();

// @route   POST api/korisnici
// @desc    Registriraj korisnik
// @access  Public
router.post('/', (req, res) => {
  res.send('Registiraj korisnik');
});

module.exports = router;
