require('dotenv').config()
const Quote = require('../models/quotes');
const { Router } = require('express');
const router = Router();

//index route
router.get('/', async (req, res) => {
	res.json(await Quote.find({}));
});

//create route
router.post('/', async (req, res) => {
	res.json(await Quote.create(req.body));
});

//update route
router.put('/quote/:id', async (req, res) => {
	res.json(
		await Quote.findByIdAndUpdate(req.params.id, req.body, { new: true })
	);
});

//delete route
router.delete('/quote/:id', async (req, res) => {
	res.json(await Quote.findByIdAndRemove(req.params.id));
});

module.exports = router;
