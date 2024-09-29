import jwt from "jsonwebtoken";
import { responseAPI, responseDenied } from "./response.js";
import cookie from 'cookie';

export const verifyToken = (req, res, callback) => {
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.accessToken;

    if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                console.error("JWT Error:", err);
                return responseAPI(res, false, 400, "Failed to authenticate token");
            }
            if (decoded) {
                callback(decoded);
            }
        });

    } else {
        return responseDenied(res);
    }
};
