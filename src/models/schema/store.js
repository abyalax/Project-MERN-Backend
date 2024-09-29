import mongoose from 'mongoose';
import { Product } from './product';


// Schema untuk store
const StoreSchema = new mongoose.Schema({
  storeId: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  products: [Product],
});

export const Store = mongoose.model('Store', StoreSchema);
