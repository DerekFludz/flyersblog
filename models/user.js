var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt-nodejs'),
    Article  = require('./article'),
    Comment  = require('./comment.js');

var userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileIMG: String,
  dateCreated: { type: Date, default: Date.now },
  admin: Boolean,
  articles: [Article.schema],
  comments: [Comment.schema]
});

// userSchema.methods.deleteComment = function(id) {
//   comments.id.remove();
// };

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model('User', userSchema);

module.exports = User;
