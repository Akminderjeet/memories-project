import { response } from 'express';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import orderRoutes from './routes/orders.js';
import Contact from './routes/contact.js'
import session from 'express-session';

// const { response } = require('express');
const app = express();

import passport from 'passport';
import Passportgoogle from 'passport-google-oauth2';
const GoogleStrategy = Passportgoogle.Strategy;
//ClientID:  803687131159-u30gh2ml07o380m88qtbrcm20ftrc0a5.apps.googleusercontent.com
//ClientSecret: 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
passport.use(new GoogleStrategy({
    clientID: '803687131159-u30gh2ml07o380m88qtbrcm20ftrc0a5.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "https://nature-o-kart.herokuapp.com/google/callback",
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

app.use(
    cors({
        origin: "https://nimble-tarsier-dfb7fd.netlify.app",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);



app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://admin-farmmitra:farmmitra.user@cluster1.tctdt.mongodb.net/farmappsss?retryWrites=true&w=majority', { useNewUrlParser: true });
const CLIENT_URL = "https://nimble-tarsier-dfb7fd.netlify.app/";


app.set('trust proxy', 1);
app.use(session({
    cookie: {
        secure: true,
        maxAge: 60000
    },
    store: new RedisStore(),
    secret: 'cats',
    saveUninitialized: true,
    resave: false
}));
app.use(passport.initialize());
app.use(passport.session());


function isLoggedIn(req, res, next) {
    console.log("sdfas");
    console.log(req.user);
    req.user ? next() : res.sendStatus(401);
}

app.use('/posts', postRoutes);
app.use('/orders', orderRoutes);
app.use('/contactsave', Contact);



app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>');
});


app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] }
    ));

app.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: CLIENT_URL,
        failureRedirect: '/auth/google/failure'
    })
);

app.get('/protected', isLoggedIn, (req, res) => {
    console.log(req.user);
    res.send(req.user.email);
});

app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('Goodbye!');
});
app.get('/check', (req, res) => {
    console.log(req.user.name);
    res.send(req.user.email);


})


app.get('/auth/google/failure', (req, res) => {
    res.send('Failed to authenticate..');
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("started");
})
