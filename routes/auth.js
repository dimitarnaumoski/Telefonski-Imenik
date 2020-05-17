const express = require('express');
const router = express.Router();

// @route   GET api/auth
// @desc    Get logiran korisnik
// @access  Private

router.get('/', (req, res) => {
  res.send('Get logiran korisnik');
});

// @route   POST api/auth
// @desc    Avtenticiraj korisnik & zemi token
// @access  Public

router.post('/', (req, res) => {
  res.send('Logiranje korisnik');
});

module.exports = router;
