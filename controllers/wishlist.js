const SelfCareItem = require('../models/selfcare');
const { Router } = require('express');
const router = Router();
const auth = require('../auth');

// get all items for a given email
router.get('/', auth, async (req, res) => {
	try {
		const { email } = req.payload;
		const wishList = await SelfCareItem.find({ email: email });
		res.status(200).json(wishList);
	} catch (error) {
		res.status(400).json({ error });
	}
});

// create a new item
router.post('/', auth, async (req, res) => {
	try {
		const newItem = await SelfCareItem.create(req.body);
		res.status(200).json(newItem);
	} catch (error) {
		res.status(400).json({ error });
	}
});

// get a single item given id
router.get('/:id', auth, async (req, res) => {
	try {
		const { id } = req.params;
		const wishList = await SelfCareItem.find({ _id: id });
		res.status(200).json(wishList);
	} catch (error) {
		res.status(400).json({ error });
	}
});

// update a single item given id
router.put('/:id', auth, async (req, res) => {
	try {
		const { id } = req.params;
		const { updates } = req.body;
		console.log(updates);
		const updatedItem = await SelfCareItem.findByIdAndUpdate(
			id,
			{ updates },
			{ new: true }
		);
		res.status(200).json(updatedItem);
	} catch (error) {
		res.status(400).json({ error });
	}
});

// delete a single item given id
router.delete('/:id', auth, async (req, res) => {
	try {
		const deleted = await SelfCareItem.findByIdAndDelete(req.params.id);
		res.status(200).json(deleted);
	} catch (error) {
		res.status(400).json({ error });
	}
});

module.exports = router;
