import mongoose from 'mongoose';

// Subschema untuk seller reply di dalam review
const SellerReplySchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Subschema untuk review produk
const ReviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String, required: true },
  like: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  sellerReply: SellerReplySchema,
});

export default ReviewSchema;
