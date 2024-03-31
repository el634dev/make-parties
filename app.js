// Initialize express and other libs
const express = require('express');
const methodOverride = require('method-override'); 
// Initialize Body-Parser and add it to app
const bodyParser = require('body-parser');
const models = require('./models');
const app = express();

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
// Mock array of projects
const events = [
    { title: "I am your first event", desc: "A great event that is super fun to look at and good", imgUrl: "https://images.unsplash.com/photo-1453227588063-bb302b62f50b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHB1cHB5JTIwcnVubmluZ3xlbnwwfHwwfHx8MA%3D%3D" },
    { title: "I am your second event", desc: "A great event that is super fun to look at and good", imgUrl: "https://images.unsplash.com/photo-1453227588063-bb302b62f50b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHB1cHB5JTIwcnVubmluZ3xlbnwwfHwwfHx8MA%3D%3D" },
    { title: "I am your third event", desc: "A great event that is super fun to look at and good", imgUrl: "https://images.unsplash.com/photo-1453227588063-bb302b62f50b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHB1cHB5JTIwcnVubmluZ3xlbnwwfHwwfHx8MA%3D%3D" }
]  

// --------------------
// ROUTES
// --------------------

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

// CREATE, POST request route
app.post('/events', (req, res) => {
  models.Event.create(req.body).then(event => {
    // Redirect to events/:id
    res.redirect(`/events/${event.id}`)
  }).catch((err) => {
    console.log(err)
  });
})

// SHOW, GET request route
app.get('/events/:id', (req, res) => {
  // Search for the event by its id that was passed in via req.params
  models.Event.findByPk(req.params.id).then((event) => {
    // If the id is for a valid event, show it
    res.render('events-show', { event: event })
  }).catch((err) => {
    // if they id was for an event not in our db, log an error
    console.log(err.message);
  })
})

// EDIT
app.get('/events/:id/edit', (req, res) => {
  models.Event.findByPk(req.params.id).then((event) => {
    res.render('events-edit', { event: event });
  }).catch((err) => {
    console.log(err.message);
  })
});

// UPDATE
app.put('/events/:id', (req, res) => {
  models.Event.findByPk(req.params.id).then(event => {
    event.update(req.body).then(event => {
      res.redirect(`/events/${req.params.id}`);
    }).catch((err) => {
      console.log(err);
    });
  }).catch((err) => {
    console.log(err);
  });
});

// DELETE
app.delete('/events/:id', (req, res) => {
  models.Event.findByPk(req.params.id).then(event => {
    event.destroy();
    res.redirect(`/`);
  }).catch((err) => {
    console.log(err);
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