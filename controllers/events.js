// controllers/events.js

const moment = require('moment');

// --------------------
// ROUTES
// --------------------

module.exports = function(app, models) {
    // Index, show all events
    app.get('/', (req, res) => {
        models.Event.findAll({ order: [['createdAt', 'DESC']] }).then(events => {
            res.render('events-index', { events: events });
        })
    })

    // --------------------
    // New, create new events
    app.get('/events/new', (req, res) => {
        models.Event.findAll().then(events => {
        res.render('events-new', { events: events });
        })
    })

    // --------------------
    // CREATE, POST request route
    app.post('/events', (req, res) => {
        models.Event.create(req.body).then(event => {
        // Redirect to events/:id
        res.redirect(`/events/${event.id}`)
        }).catch((err) => {
        console.log(err)
        });
    })

    // --------------------
    // SHOW, GET request route
    app.get('/events/:id', (req, res) => {
        models.Event.findByPk(req.params.id, { include: [{ model: models.Rsvp }] }).then(event => {
            let createdAt = event.createdAt;
            createdAt = moment(createdAt).format('MMMM Do YYYY, h:mma');
            event.createdAtFormatted = createdAt;
            res.render('events-show', { event: event });
        }).catch((err) => {
            console.log(err.message);
        })
    });

    // --------------------
    // EDIT
    app.get('/events/:id/edit', (req, res) => {
        models.Event.findByPk(req.params.id).then((event) => {
        res.render('events-edit', { event: event });
        }).catch((err) => {
        console.log(err.message);
        })
    });

    // --------------------
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

    // --------------------
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
    // SHOW
    app.get('/events/:id', async (req, res) => {
        let event = await models.Event.findById(req.params.id)
        let comments = event.getComments({ order: [ ['createdAt', 'DESC'] ] });
        let rsvps = event.getRsvps()
        res.render('events-show', { comments: comments, event: event, rsvps: rsvps });
    });
}