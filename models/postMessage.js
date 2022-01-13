import mongoose from "mongoose";
import router from "../routes/posts";

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})
const PostMessage = mongoose.model('PostMessage', postSchema);
export default router;