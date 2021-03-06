var express  = require('express'),
    router   = express.Router(),
    passport = require('passport'),
    Article  = require('../models/article.js'),
    User     = require('../models/user.js'),
    Comment  = require('../models/comment.js');

///////////////////////
// INDEX
///////////////////////

router.get('/', function(req, res){
  res.locals.login = req.isAuthenticated();
  Article.find({}, function(err, data){
    res.render('articles/index.ejs', { articles: data });
  });
});

///////////////////////
// NEW
///////////////////////

router.get('/new', function(req, res){
  if (req.isAuthenticated()) {
    res.locals.admin = req.user.admin;
    res.locals.author_id = req.user.id;
    res.locals.username = req.user.username;
  };
  res.locals.login = req.isAuthenticated();
  res.render('articles/new.ejs');
});

///////////////////////
// CREATE
///////////////////////

// ARTICLE
router.post('/', function(req, res){
  var newArticle = new Article(req.body);
  // create and save new article
  newArticle.save(function(err, data){
    // push new article into user's array of articles
    User.findById(req.user.id, function(err, user){
      user.articles.push(newArticle);
      user.save(function(err, data){
        res.redirect('/articles');
      });
    });
  });
});

// COMMENT
router.post('/:id/comments', function(req, res){
  var newComment = new Comment(req.body);
  // create comment and save to comments collection
  newComment.save(function(err, data){
    Article.findById(req.params.id, function(err, article){
      // push new comment into article's array of comments
      article.comments.push(newComment);
      article.save(function(err, data){
        User.findById(req.user.id, function(err, user){
          // push new comment into user's array of comments
          user.comments.push(newComment);
          user.save(function(err, data){
            res.redirect('/articles/' + req.params.id);
          });
        });
      });
    });
  });
});

///////////////////////
// SHOW
///////////////////////

router.get('/:id', function(req, res){
  if (req.isAuthenticated()) {
    res.locals.author_id = req.user.id;
    res.locals.username = req.user.username;
    res.locals.admin = req.user.admin;
  };
  res.locals.login = req.isAuthenticated();
  Article.findById(req.params.id, function(err, data){
    res.render('articles/show.ejs', { article: data });
  });
});

///////////////////////
// EDIT
///////////////////////

router.get('/:id/edit', function(req, res){
  res.locals.login = req.isAuthenticated();
  Article.findById(req.params.id, function(err, data){
    res.render('articles/edit.ejs', { article: data });
  });
});

///////////////////////
// UPDATE
///////////////////////

router.put('/:id', function(req, res){
  // Access the article that is being edited and change it in the Articles collection
  Article.findByIdAndUpdate(req.params.id, req.body, function(err, article){
    // Access the user via the article's author_id and update the title and body of the specific article in the user's array of articles
    User.update({_id: article.author_id, 'articles._id': req.params.id}, {$set:{'articles.$.title': req.body.title}}, {$set:{'articles.$.body': req.body.body}}, function(){
      res.redirect('/articles/' + req.params.id);
    });
  });
});

///////////////////////
// DESTROY
///////////////////////

// ARTICLE
router.delete('/:id', function(req, res){
  // remove article from articles collection
  Article.findByIdAndRemove(req.params.id, function(err, article){
    for (var i=0; i < article.comments.length; i++){
      // remove associated comments from comments collection
      Comment.findByIdAndRemove(article.comments[i].id, function(err, comment){
        // remove associated comments from user record
        User.findById(comment.author_id, function(err, user){
          user.comments.id(comment.id).remove();
          user.save(function(){
          });
        });
      });
    };
    // remove article from user record
    User.findById(article.author_id, function(err, user){
      user.articles.id(req.params.id).remove();
      user.save(function(){
        res.redirect('/users/' + req.user.id);
      });
    });
  });
});

// COMMENT
router.delete('/:index/:id', function(req, res){
  Article.findById(req.params.index, function(err, article){
    // remove individual comment from article
    article.comments.id(req.params.id).remove();
    article.save(function(){
      // remove individual comment from comments collection
      Comment.findByIdAndRemove(req.params.id, function(err, comment){
        comment.save(function(){
          // remove individual comment from user record
          User.findById(comment.author_id, function(err, user){
            user.comments.id(req.params.id).remove();
            user.save(function(){
              res.redirect('/articles/' + req.params.index);
            });
          });
        });
      });
    });
  });
});

// LOGIN CHECK
function isLoggedIn(req, res, next) {
  // if user authenticated, proceed
  if (req.isAuthenticated())
    return next();

  // if user not authenticated, redirect home
  res.redirect('/');
};

// EXPORT
module.exports = router;
