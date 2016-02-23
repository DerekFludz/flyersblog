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
  res.redirect('/users/' + req.user.id);
});

///////////////////////
// NEW
///////////////////////



///////////////////////
// CREATE
///////////////////////

router.post('/:id/image', function(req, res){
  User.findByIdAndUpdate(req.params.id, {$set:{profileIMG:req.body}}, {new:true}, function(){
    res.redirect('/users/' + req.params.id);
  });
});

///////////////////////
// SHOW
///////////////////////

router.get('/:id', function(req, res){
  res.locals.admin = req.user.admin;
  res.locals.login = req.isAuthenticated();
  User.findById(req.params.id, function(err, data){
    res.render('users/index.ejs', { user: data });
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

router.post('/', passport.authenticate('local-signup', {
  failureRedirect: '/' }), function(req, res){
    res.redirect('/articles');
  });

router.post('/login', passport.authenticate('local-login', {
  failureRedirect: '/' }), function(req, res){
    res.redirect('/users');
});

///////////////////////
// DESTROY
///////////////////////



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
