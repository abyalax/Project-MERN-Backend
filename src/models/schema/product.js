import mongoose from 'mongoose';
import ReviewSchema from './review.js';

const ProductSchema = new mongoose.Schema({
  nameStore: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  etalase: { type: String, required: true },
  stock: { type: Number, required: true },
  sold: { type: Number, default: 0 },
  rate: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  condition: { type: String, enum: ['new', 'used'], required: true },
  minOrder: { type: Number, required: true },
  image: { type: [{ secure_url: String }], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  reviews: [ReviewSchema],
});

export const Product = mongoose.model('Product', ProductSchema);
