const bcrypt = require('bcrypt');

module.exports = (app, passport, db) => {
    app.post(
        '/login',
        passport.authenticate('local', {
            // successRedirect: '/game',
            failureRedirect: '/',
            failerFlash: false
        }),
        function(req, res) {
            res.cookie("isLoggedIn", true);
            res.json({
                id: req.user._id,
                username: req.user.username
            });
        }
    );

    app.get('/logout', function(req, res) {
        console.log(
            '\n\n\n' + req.user.username + ' has been logged out.\n\n\n'
        );

        req.logout();
        res.cookie("isLoggedIn", false, {
            expires: 23213601 // 1970 unix timestamp
        });
        res.json({ message: 'successful logout' });
    });

    //register
    app.post('/api/users', (req, res) => {
        const unhashedpw = req.body.password;

        console.log(req.body);

        bcrypt.hash(unhashedpw, 10, function(err, hash) {
            db.User.create({
                username: req.body.username,
                email: req.body.email,
                password: hash,
                skin: req.body.character
            })
                .then(data => {
                    res.json({ message: 'registration successful' });
                })
                .catch(function(err) {
                    console.log('registration error: ' + err);
                });
        });
    });
};
