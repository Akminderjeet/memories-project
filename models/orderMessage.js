import mongoose from "mongoose";


const orderSchema = mongoose.Schema({
    buyer: String,
    seller: String,
    category: String,
    address: String,
    stat: Number,
    total: Number,
    count: Number,
    otp: Number

})
const OrderMessage = mongoose.model('OrderMessage', orderSchema);
export default OrderMessage;


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