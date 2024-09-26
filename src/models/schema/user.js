import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import passport from 'passport';
import LocalStrategy from 'passport-local';

// Schema untuk user
const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    verifiedEmail: { type: Boolean, default: false },
    emailVerificationHash: { type: String },
    name: { type: String, required: true },
    phone: { type: String },
    profileImage: { type: String },
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

// Menggunakan passport-local-mongoose
UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

const User = mongoose.model('User', UserSchema, 'users');

// Konfigurasi Passport
passport.use(new LocalStrategy(
  { usernameField: 'email' }, // Menentukan field yang digunakan untuk username
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      // Password sudah divalidasi oleh passport-local-mongoose, jadi kita tidak perlu validasi manual
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  console.log('serializing user: ');
  console.log(user);
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default User;