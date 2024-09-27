import bcrypt, { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { responseData, responseFailed, responseInternalServerError, responseMessage, responseNotFound, responseSuccess, responseUnauthorized } from '../../utils/response.js';
import { config } from 'dotenv';
import User from '../../models/schema/user.js';
import passport from 'passport';
import Verification from '../../models/schema/verify-email.js';

config();
const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Cek apakah email sudah diverifikasi
        const verification = await Verification.findOne({ email, status: 'VERIFIED' });
        if (!verification) {
            return responseUnauthorized(res, "Email belum diverifikasi");
        }

        // Update user baru dengan data registrasi penuh
        const newUser = new User({
            name,
            email,
            password,
            profileImage: 'https://example.com/profile.jpg',
            verifiedEmail: true, // Tandai sebagai verified
        });

        const user = await newUser.save();

        // Buat token JWT
        const token = jwt.sign({ email, name }, process.env.ACCESS_TOKEN_SECRET);
        res.cookie('accessToken', token, { maxAge: 3600000, httpOnly: true });

        return responseData(res, { user, token });
    } catch (err) {
        console.error(err);
        return responseInternalServerError(res);
    }
};

const login = async (req, res) => {
    const { email } = req.body;

    try {
        if (!email) {
            return responseNotFound(res)
        }
        const user = await User.findOne({ email });

        if (!user) {
            return responseNotFound(res)
        }

        const data = {
            id: user._id,
            email: user.email,
            name: user.name,
            phone: user.phone,
            profileImage: user.profileImage,
            role: user.role,
            address: user.address,
            carts: user.carts,
            stores: user.stores
        }

        const token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);
        res.cookie('accessToken', token, { maxAge: 3600000, httpOnly: true });

        const loginPass = passport.authenticate('local', (err, user) => {
            if (err) return next(err);
            if (!user) return responseNotFound(res)

            req.logIn(user, (err) => {
                if (err) {
                    return responseFailed(res)
                }
                return responseSuccess(res)
            });
        })
        if (!loginPass) {
            return responseMessage(res, 'Login passport failed')
        }
        return responseData(res, { user, token });
    } catch (err) {
        console.error(err);
        return responseInternalServerError(res)
    }
};

const getUser = (req, res) => {
    console.log(req.session, 'sesion', req.user)
    responseData(res, req.user)
}


const logOut = async (req, res) => {
    req.logout((err) => {
        if (err) {
            return responseInternalServerError(res)
        }
        return responseSuccess(res)
    });
}

export { register, login, logOut, getUser };
