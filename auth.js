
import passport from 'passport';
const GoogleStrategy = require('passport-google-oauth2').Strategy;

//ClientID:  803687131159-u30gh2ml07o380m88qtbrcm20ftrc0a5.apps.googleusercontent.com
//ClientSecret: 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
passport.use(new GoogleStrategy({
    clientID: '803687131159-u30gh2ml07o380m88qtbrcm20ftrc0a5.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:5000/google/callback",
    passReqToCallback: true
},
    function (request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }));

passport.serializeUser(function (user, done) {
    done(null, user);
})
passport.deserializeUser(function (user, done) {
    done(null, user);
})
