var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  dateCreated: { type: Date, default: Date.now },
  body: String
});

var Article = mongoose.model('Article', articleSchema);

module.exports = Article;
