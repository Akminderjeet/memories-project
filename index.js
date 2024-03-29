import { response } from 'express';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import orderRoutes from './routes/orders.js';
import Contact from './routes/contact.js'
import session from 'express-session';
dotenv.config();

// const { response } = require('express');
const app = express();

import passport from 'passport';
import Passportgoogle from 'passport-google-oauth2';
const GoogleStrategy = Passportgoogle.Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLEID,
    clientSecret: process.env.CLIENTSECRET,
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
        credentials: true
    })
);



app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGOURL, { useNewUrlParser: true });
const CLIENT_URL = "https://nimble-tarsier-dfb7fd.netlify.app/";


app.enable('trust proxy');
app.use(session({


    secret: 'cats',
    saveUninitialized: true,
    resave: false,
    proxy: true,
    cookie: {
        sameSite: 'none',
        secure: true
    }

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
    if (req.user) {
        req.logout();
        req.session.destroy();
        res.send('Goodbye!');
    }
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
