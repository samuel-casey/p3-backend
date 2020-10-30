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
router.put('/favs', async (req, res) => {
	const quoteId = req.body.quoteId;
	const userEmail = req.body.email;

	let removedQuote = null;
	let addedQuote = null;

	try {
		const userData = await User.findOne({ email: userEmail });
		console.log(userData);
		const userFavs = await userData.favsList;

		if (userFavs.indexOf(quoteId) !== -1) {
			console.log('already there');
			removedQuote = await User.findOneAndUpdate(
				{ email: userEmail },
				// addToSet to add an new fav quote, pullAll to remove a no-longer fav quote
				{ $pullAll: { favsList: [quoteId] } },
				{ new: true }
			);
		} else {
			console.log('not there');
			addedQuote = await User.findOneAndUpdate(
				{ email: userEmail },
				// addToSet to add an new fav quote, pullAll to remove a no-longer fav quote
				{ $addToSet: { favsList: [quoteId] } },
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

// GET /favs route
// .populate() favsList
// send back only favsList as json

router.put('/getFavs', async (req, res) => {
	const userEmail = req.body.email;
	console.log('userEmail', userEmail);

	try {
		const userData = await User.findOne({ email: userEmail }).populate(
			'favsList'
		);
		console.log('userData', userData);
		const userFavQuotes = userData.favsList;
		console.log(userFavQuotes);
		res.status(200).json(userFavQuotes);
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
