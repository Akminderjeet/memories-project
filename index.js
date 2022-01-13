import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Cors from 'cors';
import postRoutes from './routes/posts.js';

const app = express();

app.use('/posts', postRoutes);
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(Cors());


//mongoose.connect('mongodb+srv://admin-farmmitra:farmmitra.user@cluster1.tctdt.mongodb.net/farmappss?retryWrites=true&w=majority', { useNewUrlParser: true });

app.get("/", function (req, resp) {
    resp.send("this is done");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("started");
})






