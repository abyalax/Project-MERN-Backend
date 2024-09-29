import mongoose from 'mongoose';

// Subsidiary schema untuk store products
const StoreProductSchema = new mongoose.Schema({
  productId: { type: String, required: true, ref: 'Product' }, // Mengacu ke produk berdasarkan ID
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  like: { type: Boolean, default: false },
});

// Schema untuk store
const StoreSchema = new mongoose.Schema({
  storeId: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  products: [StoreProductSchema], // Array of products in the store
});

export const Store = mongoose.model('Store', StoreSchema);
