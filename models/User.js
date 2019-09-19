const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
  },
  userCreated: {
    type: Date,
    default: Date.now
  },
  salt: { type: String },
  passwordhash: { type: String },
  trainerID: { type: Number },
  party: {
    type: Array,
    max: 6
  },
  inventory: {
    favoriteItem: { type: String },
    items: { type: Array }
  },
  caught: { type: Array },
  badges: {
    boulder: { type: Boolean, default: false },
    cascade: { type: Boolean, default: false },
    thunder: { type: Boolean, default: false },
    rainbow: { type: Boolean, default: false },
    soul: { type: Boolean, default: false },
    marsh: { type: Boolean, default: false },
    volcano: { type: Boolean, default: false },
    earth: { type: Boolean, default: false }
  },
  money: { type: Number },
  flags: { type: Object }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
