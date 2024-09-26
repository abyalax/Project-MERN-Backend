import bcrypt, { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { responseData, responseFailed, responseInternalServerError, responseNotFound, responseSuccess, responseUnauthorized } from '../../utils/response.js';
import { config } from 'dotenv';
import User from '../../models/schema/user.js';

config();

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        profileImage: 'https://example.com/profile.jpg',
    });

    try {
        // const user = await newUser.save();
        const user = newUser
        const token = jwt.sign({ email, name }, process.env.ACCESS_TOKEN_SECRET);
        res.cookie('accessToken', token, { maxAge: 3600000, httpOnly: true });

        console.log({ user, token });
        return responseData(res, { user, token });
    } catch (err) {
        console.error(err);
        return responseFailed(res);
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return responseNotFound(res)
        }

        const validation = await compare(password, user.password);

        if (!validation) {
            return responseUnauthorized(res)
        }

        const token = jwt.sign({ email: user.email, name: user.name }, process.env.ACCESS_TOKEN_SECRET);
        res.cookie('accessToken', token, { maxAge: 3600000, httpOnly: true });

        console.log(req.body);
        return responseData(res, { user, token });
    } catch (err) {
        console.error(err);
        return responseInternalServerError(res)
    }
};



export { register, login };
