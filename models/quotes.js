const { Schema, model } = require('mongoose');
const quoteSchema = new Schema(
	{
		quote: String,
		theme: String,
		author: String,
		isFavorite: Boolean,
	},
	{ timestamps: true }
);

const Quote = model('Quote', quoteSchema)

module.exports = Quote
