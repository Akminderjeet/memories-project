import express, { Router } from "express";
import { getPosts, createPost, updatePost, deletePost, getallPosts } from "../controllers/posts.js"
import OrderMessage from "../models/orderMessage.js";
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
        origin: "https://nimble-tarsier-dfb7fd.netlify.app/history",
        methods: "GET,POST,PUT,DELETE,PATCH",
        credentials: true,
    })
);



app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));


function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());







router.post('/', async (req, res) => {
    if (req.user) {

        const buyer = req.user.email;
        const seller = req.body.seller;
        const category = req.body.category;
        const address = req.body.address;
        const stat = req.body.stat;
        const total = req.body.total;
        const count = req.body.count;
        const otp = 1234;

        console.log(buyer);

        const newPost = new OrderMessage({ buyer, seller, category, address, stat, total, count, otp })

        try {
            await newPost.save();
            res.json(newPost);
        }
        catch (err) {
            res.status(404).json({ message: error.message });
        }
    }
    else {

    }

});
router.get('/', async (req, resp) => {
    try {
        const postMessages = await OrderMessage.find({ seller: req.user.email, stat: 1 });
        // console.log(postMessages);
        resp.status(200).json(postMessages);
    }
    catch (err) {
        resp.status(404).json({ message: error.message });
    }
})

router.post('/dispatched', async (req, resp) => {
    const order = { seller: req.body.seller, category: req.body.fruitt, address: req.body.address, stat: 2, total: req.body.total, count: req.body.count };
    await OrderMessage.findByIdAndUpdate(req.body.id, order, { new: true });
    console.log(req.body);
});
router.get('/myorders', async (req, resp) => {
    try {
        const postMessages = await OrderMessage.find({ buyer: req.user.email });
        // console.log(postMessages);
        resp.status(200).json(postMessages);
    }
    catch (err) {
        resp.status(404).json({ message: error.message });
    }
})


router.delete('/:id', deletePost);
export default router;