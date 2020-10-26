const { Schema, model } = require('mongoose');

const userSchema = new Schema(
	{
		firstName: String,
		lastName: String,
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		favsList: [{ ref: 'Quote', type: Schema.Types.ObjectId }],
		likedList: [{ ref: 'SelfCareItem', type: Schema.Types.ObjectId }],
	},
	{ timestamps: true }
);

const User = model('user', userSchema);

module.exports = User;
