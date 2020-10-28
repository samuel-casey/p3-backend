const mongoose = require('../db/connection');
const { Schema, model } = require('mongoose');
const users = require('./user');

const SelfCareItemSchema = new Schema(
	{
		category: String,
		title: { type: String, required: true },
		time_minutes: Number,
		isComplete: { type: Boolean, default: false },
		isLiked: { type: Boolean, default: false },
		email: { type: String, required: true },
		// this flag is used to check if an item belongs to an email with the format: `demo${number}@app.com`
		isDemo: { type: Boolean, required: false, default: false },
	},
	{ timestamps: true }
);

const SelfCareItem = model('SelfCareItem', SelfCareItemSchema);

module.exports = SelfCareItem;
