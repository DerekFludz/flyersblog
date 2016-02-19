var mongoose = require('mongoose'),
    Comment  = require('./comment.js');

var articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  dateCreated: { type: Date, default: Date.now },
  imageURL: String,
  body: String,
  comments: [Comment.schema]
});

var Article = mongoose.model('Article', articleSchema);

module.exports = Article;
