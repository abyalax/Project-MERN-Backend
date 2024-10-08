import mongoose from 'mongoose';

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
  products: [{
    ProductID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  }],
});

export const Store = mongoose.model('Store', StoreSchema);
