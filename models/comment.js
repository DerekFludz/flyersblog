var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  author: String,
  author_id: String,
  authorIMG: String,
  body: String,
  dateCreated: { type: Date, default: Date.now }
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
