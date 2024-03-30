// Initialize express and other libs
const express = require('express');
// Initialize Body-Parser and add it to app
const bodyParser = require('body-parser');
const models = require('./models');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

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

// Use handlebars to render
app.set('view engine', 'handlebars');

// --------------------
// ROUTES
// --------------------
// Mock array of projects
const events = [
    { title: "I am your first event", desc: "A great event that is super fun to look at and good", imgUrl: "https://images.unsplash.com/photo-1453227588063-bb302b62f50b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHB1cHB5JTIwcnVubmluZ3xlbnwwfHwwfHx8MA%3D%3D" },
    { title: "I am your second event", desc: "A great event that is super fun to look at and good", imgUrl: "https://images.unsplash.com/photo-1453227588063-bb302b62f50b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHB1cHB5JTIwcnVubmluZ3xlbnwwfHwwfHx8MA%3D%3D" },
    { title: "I am your third event", desc: "A great event that is super fun to look at and good", imgUrl: "https://images.unsplash.com/photo-1453227588063-bb302b62f50b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHB1cHB5JTIwcnVubmluZ3xlbnwwfHwwfHx8MA%3D%3D" }
]  

// Index, show all events
app.get('/', (req, res) => {
    models.Event.findAll({ order: [['createdAt', 'DESC']] }).then(events => {
      res.render('events-index', { events: events });
    })
})

// new, create new events
app.get('/events/new', (req, res) => {
  models.Event.findAll().then(events => {
    res.render('events-new', { events: events });
  })
})

// create, POST request route
app.post('/events', (req, res) => {
  models.Event.create(req.body).then(event => {
    res.redirect(`/`);
  }).catch((err) => {
    console.log(err)
  });
})

// --------------------
// PORTS
// --------------------

// Choose port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
    console.log('App listening on port 3000!')
})