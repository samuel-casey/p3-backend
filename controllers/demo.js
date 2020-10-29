const User = require('../models/user');
const { Router } = require('express');
const router = Router();
const auth = require('../auth');


const seedData = require('../db/demoSeed.json')
router.post('/seed', auth, async (req, res) => {
	try{		
	const demoEmail = req.payload.email;
	//loop over seedData
	//find email key
	//update email key with demo user email
	// for(let item of seedData) {
		for(let item =0; item < seedData.length; item++){
		seedData[item].email = demoEmail
		}
		
		const demoWishList = await SelfCareItem.create(seedData)
	
		res.status(200).json(demoWishList)
	} catch (error) {
		console.log(error)
}})

// create a new item for demo user
router.get('/', async (req, res) => {
	try {
		const demoUsers = await User.find({ isDemo: true });
		const numDemoUsers = demoUsers.length;
		res.status(200).json(numDemoUsers);
	} catch (error) {
		res.status(400).json({ error });
	}
});

module.exports = router;
