// Initialize express
const express = require('express');
const app = express();

// --------------------
// Require handlebars
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

// --------------------
// Use 'main' as our default layout
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main', handlebars: allowInsecurePrototypeAccess(Handlebars) }));
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
    res.render('events-index', { events: events });
})

// --------------------
// PORT
// --------------------

// Choose port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
    console.log('App listening on port 3000!')
})