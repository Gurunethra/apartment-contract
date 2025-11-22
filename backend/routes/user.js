// @ts-nocheck

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config');

const router = express.Router();
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, apartment, designation, phone } = req.body;
    
    if (!email || !password || !name) 
      return res.status(400).json({ msg: 'Missing fields' });
    
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: 'User already exists' });

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({ 
      name, email, password: hashed, role, apartment, designation, phone 
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '7d' });

    res.json({ 
      token, 
      user: { id: user._id, name: user.name, email: user.email, role: user.role } 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '7d' });

    res.json({ 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role, 
        apartment: user.apartment 
      } 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});
router.get('/all', async (req, res) => {
  try {
    const { role } = req.query; 
    const filter = role ? { role } : {};
    const users = await User.find(filter).limit(100);
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;

