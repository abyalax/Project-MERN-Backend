import mongoose from 'mongoose';

// Definisikan schema `Verification`
const VerificationSchema = new mongoose.Schema({
    email: { type: String, required: true },
    verificationHash: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    status: { type: String, default: 'PENDING' }
});

// Buat model `Verification`
const Verification = mongoose.model('Verification', VerificationSchema);

// Export model
export default Verification;
