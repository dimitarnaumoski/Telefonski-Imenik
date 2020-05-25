const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Konektiranje database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Definiranje Routes
app.use('/api/korisnici', require('./routes/korisnici'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/kontakti', require('./routes/kontakti'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // setiranje na staticen folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  ); // * znaci sve osven tie tri gore
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
