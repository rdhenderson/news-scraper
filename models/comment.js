// Require mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create the Note schema
const CommentSchema = new Schema({
  // Just a string
  title: {
    type: String,
    required: true,
  },
  // Just a string
  body: {
    type: String,
  },
  username: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  created_date: { type: Date, default: Date.now },
});

// Remember, Mongoose will automatically save the ObjectIds of the notes
// These ids are referred to in the Article model

// Create and Export the Note model with the NoteSchema
module.exports = mongoose.model('Comment', CommentSchema);
