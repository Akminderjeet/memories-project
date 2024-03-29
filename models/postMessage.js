import mongoose from "mongoose";


const postSchema = mongoose.Schema({
    tag: String,
    email: String,
    fruit: String,
    title: String,
    price: Number,
    selectedFile: String,
})
const PostMessage = mongoose.model('PostMessage', postSchema);
export default PostMessage;


// email: String,
//     title: String,
//     message: String,
//     price: Number



// title: String,
//     message: String,
//     creator: String,
//     tags: [String],
//     selectedFile: String,
//     likeCount: {
//         type: Number,
//         default: 0
//     },
//     createdAt: {
//         type: Date,
//         default: new Date()
//     }