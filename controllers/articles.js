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
  res.locals.login = req.isAuthenticated();
  res.render('articles/new.ejs');
});

///////////////////////
// CREATE
///////////////////////

router.post('/', function(req, res){
  var newArticle = new Article(req.body);
  newArticle.save(function(err, data){
    res.redirect('/articles');
  });
});

// router.post('/', function(req, res){
//   var newArticle = new Article(req.body);
//   newArticle.save(function(err, data){
//     User.findById(req.user.id, function(err, user){
//       user.articles.push(newArticle);
//       user.save(function(err, data){
//         res.redirect('/articles');
//       });
//     });
//   });
// });

///////////////////////
// SHOW
///////////////////////

router.get('/:id', function(req, res){
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
  Article.findByIdAndUpdate(req.params.id, req.body, function(err, data){
    res.redirect('/articles/' + req.params.id);
  });
});

///////////////////////
// SIGNUP/LOGIN/LOGOUT
///////////////////////

// router.post('/', passport.authenticate('local-signup', {
//   failureRedirect: '/' }), function(req, res){
//     res.redirect('/articles');
//   });

// router.post('/login', passport.authenticate('local-login', {
//   failureRedirect: '/' }), function(req, res){
//     res.redirect('/articles');
// });

// router.get('/logout', function(req, res){
//   req.logout();
//   res.redirect('/');
// });

///////////////////////
// DESTROY
///////////////////////

router.delete('/:id', function(req, res){
  Article.findByIdAndRemove(req.params.id, function(err, article){
    res.redirect('/articles');
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
