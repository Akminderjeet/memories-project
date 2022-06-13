import express from 'express';

import cors from 'cors';
const app = express();

app.use(
    cors({
        origin: "https://nature-o-kart.herokuapp.com/auth/google",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);