import express from 'express';

import cors from 'cors';
const app = express();

app.use(
    cors({
        origin: "https://nimble-tarsier-dfb7fd.netlify.app",
        methods: "GET,POST,PUT,DELETE",
        credentials: true
    })
);