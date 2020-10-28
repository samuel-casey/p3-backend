require('dotenv').config();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Router } = require('express');
const router = Router();
const { SECRET } = process.env;

// NEED TO USE THIS FOR DEMO USER TOO
router.post('/signup', async (req, res) => {
	try {
		req.body.password = await bcrypt.hash(req.body.password, 10);
		const newUser = await User.create(req.body);
		res.status(200).json(newUser);
	} catch (error) {
		res.status(400).json({ error });
	}
});

// NEED TO USE THIS FOR DEMO USER TOO
router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (user) {
			const match = await bcrypt.compare(password, user.password);
			if (match) {
				const token = await jwt.sign({ email }, SECRET);
				res.status(200).json({ token, email });
			} else {
				res.status(400).json({ error: 'PASSWORD DOES NOT MATCH' });
			}
		} else {
			res.status(400).json({ error: 'USER DOES NOT EXIST' });
		}
	} catch (error) {
		res.status(400).json({ error });
	}
});

module.exports = router;
