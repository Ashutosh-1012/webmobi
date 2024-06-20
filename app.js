// app.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/user');

const app = express();
app.use(bodyParser.json());

User.sequelize.sync();

// Register endpoint
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).send('All fields are required.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await User.create({ username, email, password: hashedPassword });
        res.status(201).send('User registered successfully.');
    } catch (error) {
        res.status(400).send('Error registering user.');
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('Email and password are required.');
    }
    const user = await User.findOne({ where: { email } });
    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).send('Invalid credentials.');
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
});

// Middleware to protect endpoints
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.sendStatus(403);
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};

// Profile endpoint
app.get('/profile', authenticateToken, async (req, res) => {
    const user = await User.findByPk(req.user.id);
    if (!user) {
        return res.sendStatus(404);
    }
    res.status(200).json({
        username: user.username,
        email: user.email
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
