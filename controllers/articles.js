var express  = require('express'),
    router   = express.Router(),
    passport = require('passport'),
    Article  = require('../models/article.js'),
    User     = require('../models/user.js');

///////////////////////
// INDEX
///////////////////////

router.get('/', function(req, res){
  Article.find({}, function(err, data){
    res.render('articles/index.ejs', { articles: data });
  });
});

///////////////////////
// NEW
///////////////////////

router.get('/new', function(req, res){
  res.render('articles/new.ejs');
});

///////////////////////
// CREATE
///////////////////////

// router.post('/:id', function(req, res){
//   var newArticle = new Article(req.body);
//   newArticle.save(function(err, data){
//     User.findById(req.params.id, function(err, user){
//       user.articles.push(newArticle);
//       user.save(function(err, data){
//         res.redirect('/profile/' + req.params.id);
//       });
//     });
//   });
// });

///////////////////////
// SHOW
///////////////////////

router.get('/:id', function(req, res){
  Article.findById(req.params.id, function(err, data){
    res.render('articles/show.ejs', { articles: data });
  });
});

///////////////////////
// EDIT
///////////////////////



///////////////////////
// UPDATE
///////////////////////



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

// CHECK IF LOGGED IN FOR COMMENT CAPABILITY
// function isLoggedIn(req, res, next) {
//   // if user authenticated, proceed
//   if (req.isAuthenticated())
//     return next();
//
//   // if user not authenticated, redirect home
//   res.redirect('/');
// };

// EXPORT
module.exports = router;