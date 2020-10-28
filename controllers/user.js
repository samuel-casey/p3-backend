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

// Check if user has already favorited quote and update their favsList array accordingly
//// find user by id
//// find user's fav list array
//// remove quote's id from favsList if already in array
//// add quote's id to favsList if not already in array
router.put('/:id', async (req, res) => {
	const quote = req.body;
	const userId = req.params.id;
	let removedQuote = null;
	let addedQuote = null;

	try {
		const userData = await User.findById(userId);
		const userFavs = userData.favsList;

		console.log(quote);
		console.log(userFavs);
		console.log(userFavs.indexOf(quote));

		if (userFavs.indexOf(quote._id) !== -1) {
			console.log('already there');
			removedQuote = await User.findByIdAndUpdate(
				userId,
				// addToSet to add an new fav quote, pullAll to remove a no-longer fav quote
				{ $pullAll: { favsList: [quote] } },
				{ new: true }
			);
		} else {
			console.log('not there');
			addedQuote = await User.findByIdAndUpdate(
				userId,
				// addToSet to add an new fav quote, pullAll to remove a no-longer fav quote
				{ $addToSet: { favsList: [quote] } },
				{ new: true }
			);
		}

		if (removedQuote !== null) {
			res.status(200).json(removedQuote);
		} else if (addedQuote !== null) {
			res.status(200).json(addedQuote);
		}
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
