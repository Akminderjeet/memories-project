import PostMessage from "../models/postMessage.js";

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