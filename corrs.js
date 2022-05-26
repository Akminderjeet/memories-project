import express from 'express';

import cors from 'cors';
const app = express();

app.use(
    cors({
        origin: "http://localhost:5000/auth/google",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);