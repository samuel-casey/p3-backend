const mongoose = require("../db/connection");
const {Schema, model} = require("mongoose");

const SelfCareItemSchema = new Schema({
  Category: String,
  time_minutes: Number,
  isComplete: Boolean,
  isLiked: Boolean,
  user: {
    ref: "user",
    type: mongoose.Schema.Types.ObjectId,
  },
});
{
  timestamps: true;
}

const SelfCareItem = model("SelfCareItem", SelfCareItemSchema);

module.exports = SelfCareItem;

