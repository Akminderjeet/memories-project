import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";
import '../corrs.js'


export const getPosts = async (req, resp, next) => {
    if (req.user) {

        try {
            const postMessages = await PostMessage.find({ email: req.user.email });
            console.log(postMessages);
            resp.json(postMessages);
        }
        catch (err) {
            resp.status(404).json({ message: error.message });
        }
    }
    else {

    }

}
export const getallPosts = async (req, resp) => {

    try {
        const postMessages = await PostMessage.find();
        console.log(postMessages);
        resp.status(200).json(postMessages);
    }
    catch (err) {
        resp.status(404).json({ message: error.message });
    }

}


export const createPost = async (req, resp) => {

    // const { fruit, title, price, selectedFile } = req.body;
    const tag = "asd";
    const email = req.user.email;
    const fruit = req.body.fruit;
    const title = req.body.title;
    const price = req.body.price;
    const selectedFile = req.body.selectedFile;
    console.log(email);

    const newPost = new PostMessage({ tag, email, fruit, title, price, selectedFile })

    try {
        await newPost.save();
        resp.json(newPost);
    }
    catch (err) {
        resp.status(404).json({ message: error.message });
    }
    // resp.send("Post Creation");
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;


    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);


    await PostMessage.deleteOne({ _id: id });
    res.send("done");

}