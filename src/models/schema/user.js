import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    verifiedEmail: { type: Boolean, default: false },
    emailVerificationHash: { type: String },
    name: { type: String, required: true },
    phone: { type: String },
    password: { type: String },
    profileImage: { type: String },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    address: [
      {
        recipient: { type: String, required: true },
        addressLine: { type: String, required: true },
        phone: { type: String, required: true },
        isMain: { type: Boolean, default: false },
      },
    ],
    carts: [
      {
        productId: { type: String, required: true, ref: 'Product' },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        like: { type: Boolean, default: false },
      },
    ],
    stores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Store' }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', UserSchema, 'users');

export default User;
