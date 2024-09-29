import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String, required: true },
  like: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  sellerReply: [{
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  }],
});

export default ReviewSchema;
