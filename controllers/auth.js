// controllers/auth.js
const user = require("../models/user");
const jwt = require('jsonwebtoken');

function generateJWT(user) {
    const mpJWT = jwt.sign({ id: user.id }, "AUTH-SECRET", { expiresIn: 60*60*24*60 });

    return mpJWT
}

// --------------------
// ROUTES
// --------------------

module.exports = function(app, models) {
    // --------------------
    // GET, sign-up route
    app.get('/sign-up', (req, res) => {
        res.render('sign-up', { msg: 'Sign up was successful' })
    })

    // --------------------
    // GET, login route
    app.get('/login', (req, res) => {
        res.render('login', { msg: 'Login successful' });
    })

    // --------------------
    // POST, sign-up route
    app.post("/sign-up", (req, res) => {
        models.User.create(req.body)
            .then(user => {
                // after creating the user
                const mpJWT = generateJWT(user)
                // save as cookie
                res.cookie("mpJWT", mpJWT)
                // Redirect to events/:id
                res.redirect(`/`)
            }).catch((err) => {
                console.log(err)
            });

    });

    // after creating the user
    const mpJWT = generateJWT(user)

    // POST, login route
    app.post('/login', (req, res) => {
        console.log('Submitted data successful: ', req.body);
        res.render('login');
    })

}