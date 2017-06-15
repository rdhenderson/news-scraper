// Require mongoose
const mongoose = require('mongoose');
// Plugin to search for entry and create if not found
const findOrCreate = require('mongoose-find-or-create');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  // TODO: Currently not tracking user comments
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  // Track user favorites
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Article',
    },
  ],
  created_date: { type: Date, default: Date.now },
});

UserSchema.plugin(findOrCreate);

// Remember, Mongoose will automatically save the ObjectIds of the comments/favorites
// These ids are referred to in the Article model

// Create and Export the model
module.exports = mongoose.model('User', UserSchema);
