import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { responseData, responseSuccess, responseInternalServerError, responseUnauthorized, responseAPI, responseError } from '../../utils/response.js';
import { config } from 'dotenv';
import User from '../../models/schema/user.js';
import Verification from '../../models/schema/verify-email.js';

config();
const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const verification = await Verification.findOne({ email, status: 'VERIFIED' });
        if (!verification) {
            return responseAPI(res, false, 401, "Email is not verified");
        }
        const userAtDB = await User.findOne({ email });
        if (userAtDB) return responseAPI(res, false, 409, "Email already registered");
        const passwordHass = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: passwordHass,
            profileImage: 'https://example.com/profile.jpg',
            verifiedEmail: true,
        });
        const user = await newUser.save();
        if (!user) return responseAPI(res, false, 400, "Failed to register user");
        const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });

        res.cookie('accessToken', token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            domain: '.vercel.app',
            secure: true,
            sameSite: "Lax",
            path: "/"
        });
        const data = {
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            token
        }
        return responseData(res, data);
    } catch (err) {
        return responseError(res, err)
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password || email === undefined || password === undefined || email === '' || password === '')
            return responseAPI(res, false, 400, "Email and password are required");
        const user = await User.findOne({ email });
        if (!user)
            return responseAPI(res, false, 404, "User not found");
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return responseAPI(res, false, 401, "Incorrect password disini");
        }
        const tokenData = {
            id: user._id,
            role: user.role
        };
        const token = jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
        if (token) {
            console.log("Assign Token: ", token)
        }
        res.cookie('accessToken', token, {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
            domain: '.vercel.app',
            secure: true,
            sameSite: "Lax",
            path: "/"
        });

        const userResponse = {
            id: user._id,
            name: user.name,
            email: user.email,
            verifiedEmail: user.verifiedEmail,
            phone: user.phone,
            profileImage: user.profileImage,
            role: user.role,
            address: user.address,
            carts: user.carts,
            stores: user.stores
        };
        return responseData(res, { user: userResponse, token });
    } catch (err) {
        return responseError(res, err)
    }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return responseAPI(res, false, 404, 'user not found');
        }
        const response = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            profileImage: user.profileImage,
            role: user.role,
            address: user.address,
            carts: user.carts,
            stores: user.stores
        }
        return responseData(res, response);
    } catch (err) {
        return responseError(res, err)
    }
};

const Logout = (req, res) => {
    const token = req.userId
    if (!token) return responseUnauthorized(res)
    const remove = res.clearCookie('accessToken');
    if (remove) return responseSuccess(res)
    return responseInternalServerError(res)
}


export { register, login, getUser, Logout };
