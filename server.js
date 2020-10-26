// imports
const express = require('express');
const morgan = require('morgan');
const mongoose = require('./db/connection');
const cors = require('cors');
const corsOptions = require('./configs/cors');
require('dotenv').config();
const AuthRouter = require('./controllers/user');
const auth = require('./auth');

// Server instance
const app = express();

// ENV Variables
const { PORT, NODE_ENV } = process.env;
// const PORT = process.env.PORT || 5000;

// Middleware
// LEAVING CORS OPTIONS FOR POST-MVP
// app.use(NODE_ENV === 'production' ? cors(corsOptions) : cors());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); //logging

// Routes and Routers
// Route for testing server is working
console.log('NODE_ENV', NODE_ENV);

app.get('/', (req, res) => {
	res.json({
		hello: 'Hello World! Take care of yourself today.',
	});
});

app.use('/auth', AuthRouter);

app.get('/', auth, (req, res) => {
	res.json(req.payload);
});

//LISTENER
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
