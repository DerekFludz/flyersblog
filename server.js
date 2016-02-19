var express        = require('express'),
    app            = express(),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    mongoose       = require('mongoose'),
    session        = require('express-session'),
    passport       = require('passport'),
    db             = mongoose.connection,
    mongoUri       = process.env.MONGOLAB_URI || 'mongodb://localhost/flyers_blog',
    port           = process.env.PORT || 3000;

///////////////////////
// MIDDLEWARE
///////////////////////

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// PASSPORT
// app.use(session({secret:'ghostbear'}));
// app.use(passport.initialize());
// app.use(passport.session());

// require('./config/passport.js')(passport);

///////////////////////
// CONTROLLERS
///////////////////////

// HOME PAGE
app.get('/', function(req, res){
  res.locals.login = req.isAuthenticated();
  res.render('index.ejs');
});

// ARTICLES
var articlesController = require('./controllers/articles.js');
app.use('/articles', articlesController);

// USERS
var usersController = require('./controllers/users.js');
app.use('/users', usersController);

// LOGIN CHECK
function isLoggedIn(req, res, next) {
  // if user authenticated, proceed
  if (req.isAuthenticated())
    return next();

  // if user not authenticated, redirect home
  res.redirect('/');
};

///////////////////////
// LISTEN
///////////////////////

mongoose.connect(mongoUri);

// db.once('open', function(){
//   app.listen(port, function(){
//     console.log('listening');
//   });
// });

app.listen(port, function(){
  console.log('=============================');
  console.log('Running on port ' + port)
  console.log('=============================');
});
