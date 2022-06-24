import express, { Router } from "express";
import { getPosts, createPost, updatePost, deletePost, getallPosts } from "../controllers/posts.js"
const router = express.Router();

// localhost:5000/posts/
import { response } from 'express';

import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

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
        credentials: true
    })
);




app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));


function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}
app.enable('trust proxy');
app.use(session({
    secret: 'cats', resave: false, saveUninitialized: false, proxy: true, cookie: {

        secure: true,

    }
}));

app.use(passport.initialize());
app.use(passport.session());







router.get('/all', getallPosts);
router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
export default router;