const mongoose = require('mongoose');
require('dotenv').config();

const config = { useUnifiedTopology: true, useNewUrlParser: true };

const { DB_URL } = process.env;
mongoose.connect(DB_URL, config);

const DB = mongoose.connection;

DB.on('open', () => console.log('Connected to Mongo'))
	.on('close', () => console.log('Disconnected from Mongo'))
	.on('error', (err) => console.log(err));

module.exports = mongoose;
