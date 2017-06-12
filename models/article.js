const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title:  { type: String, trim: true, required : true },
    link: {type: String , trim: true, required : true, index: { unique: true } },
    detail: {type: String },
    source: {type: String, trim: true, required: true },
    created_date: {type: Date, default: Date.now},
    updated_date: {type: Date, default: Date.now},
    comments: [{
      // Store ObjectIds in the array
      type: Schema.Types.ObjectId,
      // The ObjectIds will refer to the ids in the Note model
      ref: "Comment"
  }],
});

module.exports = mongoose.model('Article', ArticleSchema);
// ServerSchema.index({serverIp: 1}, {unique: true});
