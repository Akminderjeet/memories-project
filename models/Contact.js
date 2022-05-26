import mongoose from "mongoose";


const contactSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    message: String

})
const Contactschema = mongoose.model('Contactschema', contactSchema);
export default Contactschema;


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