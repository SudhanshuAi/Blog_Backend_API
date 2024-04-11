const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser'); // Require body-parser
const db = require('../db');

const router = express.Router();

// Use body-parser middleware
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


// JWT Secret
const JWT_SECRET = '123456';

// User signup
router.post('/signup', async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const { email, password } = req.body;

    // Email validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
    }

    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    await db.query(sql, [email, password]);
    
    const token = jwt.sign({ email }, JWT_SECRET);
    res.json({ token });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ error: 'Error while signing up' });
  }
});

// User signin
router.post('/api/v1/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Email validation using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    const results = await db.query(sql, [email, password]);

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ email }, JWT_SECRET);
    res.json({ token });
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ error: 'Error while signing in' });
  }
});

module.exports = router;