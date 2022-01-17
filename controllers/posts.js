import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

export const getPosts = async (req, resp) => {
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
    const post = req.body;

    const newPost = new PostMessage(post);
    try {
        await newPost.save();
        resp.status(201).json(newPost);
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