const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const findOrCreate = require('mongoose-find-or-create');

const ArticleSchema = new Schema({
  title: { type: String, trim: true, required: true },
  link: { type: String, trim: true, required: true, index: { unique: true } },
  detail: { type: String },
  source: { type: String, trim: true, required: true },
  created_date: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },
  comments: [
    {
      // Store ObjectIds in the array
      type: Schema.Types.ObjectId,
      // The ObjectIds will refer to the ids in the Comment model
      ref: 'Comment',
    },
  ],
});

ArticleSchema.plugin(findOrCreate);

module.exports = mongoose.model('Article', ArticleSchema);
// ServerSchema.index({serverIp: 1}, {unique: true});
