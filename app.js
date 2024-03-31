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

require('./controllers/events')(app, models);

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
// PORTS
// --------------------

// Choose port to listen on
const PORT = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`)
})