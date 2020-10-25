// imports
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

// Server instance
const app = express();

// ENV Variables
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); //logging

// Routes and Routers
// Route for testing server is working
app.get('/', (req, res) => {
	res.json({
		hello: 'Hello World! Take care of yourself today.',
	});
});

//LISTENER
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
