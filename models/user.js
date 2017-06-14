// Require mongoose
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Plugin to find or create user
const findOrCreate = require('mongoose-find-or-create')

// Create the Note schema
const UserSchema = new Schema({
  // Just a string
  name: {
    type: String,
    required: true,
    unique: true,
  },
  // Track user comments
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }],
  // Track user favorites
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: "Article",
  }],
  created_date: {type: Date, default: Date.now},
});

UserSchema.plugin(findOrCreate)

// Remember, Mongoose will automatically save the ObjectIds of the notes
// These ids are referred to in the Article model

// Create and Export the model
module.exports = mongoose.model("User", UserSchema);
