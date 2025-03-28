const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./models/User');

const app = express();
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://sauravkreji:GYRAH53ZLpSR9YB4@cluster0.81y7c.mongodb.net/user-authentication?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.post('/api/login', async (req, res) => {
  console.log('Login request received:', req.body);
  const { userId, password } = req.body;
  try {
    const user = await User.findOne({ userId, password });
    if (user) {
      res.json({ success: true, user: { userId: user.userId, role: user.role } });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/users', async (req, res) => {
  console.log('Users request received with delay:', req.query.delay);
  const { delay } = req.query;
  try {
    if (delay) {
      await new Promise(resolve => setTimeout(resolve, parseInt(delay)));
    }
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error('Get users error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/users', async (req, res) => {
  console.log('Add user request received:', req.body);
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (err) {
    console.error('Add user error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
