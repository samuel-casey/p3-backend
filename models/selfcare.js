const mongoose = require("../db/connection");
const {Schema, model} = require("mongoose");
const users = require("./user")

const SelfCareItemSchema = new Schema({

  category: String,
  title: {type: String, required: true},
  time_minutes: Number,
  isComplete: {type: Boolean, default: false},
  isLiked: {type: Boolean, default: false},
  email: {type: String, required: true}

});
{
  timestamps: true;
}

const SelfCareItem = model("SelfCareItem", SelfCareItemSchema);

module.exports = SelfCareItem;

