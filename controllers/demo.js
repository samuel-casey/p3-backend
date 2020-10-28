const SelfCareItem = require('../models/selfcare');
const { Router } = require('express');
const router = Router();
const auth = require('../auth');

// create a new item for demo user
router.post('/', auth, async (req, res) => {
	try {
		// find the number of users in the database with an email that contains 'demo'
		const demoUsers = await SelfCareItem.find({
			isDemo: true,
		});
		// set the email of the new demo user to be 1 more than the last demo user who logged in
		const demoUserNumber = demoUsers.length + 1;
		// ensures that each time a person clicks the demo button it creates a new demo user
		req.body.email = `demo${demoUserNumber}@pause.app`;
		req.body.isDemo = true;
		console.log(req.body);
		const newDemoItem = await SelfCareItem.create(req.body);
		res.end();
		// res.status(200).json(newDemoItem);
	} catch (error) {
		res.status(400).json({ error });
	}
});

// create a new item for demo user
router.get('/', auth, async (req, res) => {
	try {
		const demoUsers = await SelfCareItem.find({ isDemo: true });
		console.log(demoUsers.length);
		res.status(200).json(newDemoItem);
	} catch (error) {
		res.status(400).json({ error });
	}
});

module.exports = router;
