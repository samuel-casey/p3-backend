require('dotenv').config();
const Quote = require('../models/quotes');
const { Router } = require('express');
const router = Router();

//index route
router.get('/', async (req, res) => {
	res.json(await Quote.find({}));
});

//route to find a single quote
router.get('/:id', async (req, res) => {
	res.json(await Quote.findById(req.params.id));
});

//create route
router.post('/', async (req, res) => {
	res.json(await Quote.create(req.body));
});

//update route
router.put('/:id', async (req, res) => {
	res.json(
		await Quote.findByIdAndUpdate(req.params.id, req.body, { new: true })
	);
});

//delete route
router.delete('/:id', async (req, res) => {
	res.json(await Quote.findByIdAndRemove(req.params.id));
});

module.exports = router;
