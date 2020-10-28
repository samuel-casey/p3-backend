const User = require('../models/user');
const { Router } = require('express');
const router = Router();
const auth = require('../auth');

// create a new item for demo user
router.get('/', async (req, res) => {
	try {
		const demoUsers = await User.find({ isDemo: true });
		const numDemoUsers = demoUsers.length;
		console.log(numDemoUsers);
		res.status(200).json(numDemoUsers);
	} catch (error) {
		res.status(400).json({ error });
	}
});

module.exports = router;
