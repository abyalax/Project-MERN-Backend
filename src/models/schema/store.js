import mongoose from 'mongoose';

const StoreProductSchema = new mongoose.Schema({
  productId: { type: String, required: true, ref: 'Product' },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  like: { type: Boolean, default: false },
});

const StoreSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  store: { type: String, required: true },
  phone: { type: String, required: true },
  domain: { type: String, required: true },
  address: {
    provincy: { type: String, required: true },
    regency: { type: String, required: true },
    municipality: { type: String, required: true },
    village: { type: String, required: true },
    kodePost: { type: Number, required: true },
  },
  products: [StoreProductSchema],
});

export const Store = mongoose.model('Store', StoreSchema);