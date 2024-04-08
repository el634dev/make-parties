// Initialize express and other libs
const express = require('express');
const methodOverride = require('method-override'); 
// Initialize Body-Parser and add it to app
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const models = require('./models');

// --------------------
// Choose port to listen on
const PORT = process.env.PORT || 3000;
// Create new instance
const app = express();

// --------------------
app.use(bodyParser.urlencoded({ extended: true }));
// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

// --------------------
// Require handlebars
const exhbs = require('express-handlebars');
const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

// --------------------
// Use 'main' as our default layout
app.engine('handlebars', exhbs.engine({ 
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  defaultLayout: 'layout'
}));

// --------------------
// Use handlebars to render
app.set('view engine', 'handlebars');

// --------------------
// Auth Middleware
app.use(cookieParser());

app.use(function authenticateToken(req, res, next) {
  // Gather the jwt access token from the cookie
  const token = req.cookies.mpJWT;

  if (token) {
    jwt.verify(token, "AUTH-SECRET", (err, user) => {
      if (err) {
        console.log(err)
        // redirect to login if not logged in and trying to access a protected route
        res.redirect('/login')
      }
      req.user = user
      next(); // pass the execution off to whatever request the client intended
    })
  } else {
    next();
  }
});

app.use(function presentToken(req, res, next) {
  // if a valid JWT token is present
  if (req.user) {
    // Look up the user's record
    models.User.findByPk(req.user.id)
      .then(currentUser => {
        // make the user object available in all controllers and templates
        res.locals.currentUser = currentUser;
        next()
    }).catch(err => {
        console.log(err)
    })
  } else {    
    next();
  }
});

// --------------------
// Controllers
require('./controllers/events')(app, models);
require('./controllers/rsvps')(app, models);
require('./controllers/auth')(app, models);

// --------------------
// PORTS
// --------------------

// Tell the app what port to listen on
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`)
})