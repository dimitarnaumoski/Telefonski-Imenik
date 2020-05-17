const express = require('express');

const app = express();

app.get('/', (req, res) =>
  res.send({ msg: 'Добредојдовте во API-то од телефонскиот именик.' })
);

// Definiranje Routes
app.use('/api/korisnici', require('./routes/korisnici'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/kontakti', require('./routes/kontakti'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
