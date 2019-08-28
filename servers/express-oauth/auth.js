const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
// require('dotenv').config()
require('custom-env').env(true);

console.log(process.env.CALLBACK_URL);

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
    passport.use(new GoogleStrategy({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            // callbackURL: "http://localhost:8080/auth/google/callback"
            // callbackURL: "https://summit-voter.appspot.com/auth/google/callback"
            callbackURL: process.env.CALLBACK_URL
        },
        (token, refreshToken, profile, done) => {
            return done(null, {
                profile: profile,
                token: token
            });
        }));
};
