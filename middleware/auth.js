const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Zemi go tokenot od headerot
  const token = req.header('x-auth-token');

  // Provri dali ima token
  if (!token) {
    return res.status(401).json({ msg: 'Нема токен, овластувањето е одбиено' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.korisnik = decoded.korisnik;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Токенот не е валиден' });
  }
};
