const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BattlePokemon = require('../game/battle/Pokemon');
// const Pokemon = require('../game/battle/Pokemon');

// Schema.Types.Pokemon = BattlePokemon;
const Pokemon = new Schema({
  name: String,
  species: Number,
  level: Number,
  ivs: {
    attack: Number,
    defense: Number,
    speed: Number,
    special: Number,
  },

  evs: {
    attack: Number,
    defense: Number,
    speed: Number,
    special: Number,
    hp: Number
  },

  moves: [
    {
      name: String,
      PP: Number,
      maxPP: Number
    }
  ],

  status: String
});

// console.log({ ...new Pokemon() });
const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
  },
  skin: {
    type: String,
    required: true,
  },
  userCreated: {
    type: Date,
    default: Date.now
  },
  trainerId: {
    type: Number,
    default: () => Math.floor(100000000000000 * Math.random())
  },
  map: {
    type: String,
    default: 'Route 1'
  },
  x: {
    type: Number,
    default: 4
  },
  y: {
    type: Number,
    default: 3
  },
  facing: {
    type: String,
    default: 'east'
  },
  party: [Pokemon],

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
  money: { type: Number, default: 2000 },
  flags: { type: Object },
  lastPokeCenter: { type: String, default: 'demo'}
});
console.log('debug');

UserSchema.pre('save', function(next){
  if (this.isNew) {
    this.party.push(new BattlePokemon(Math.floor(Math.random() * 3) * 3 + 1, 5));
  }
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
