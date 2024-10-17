import { responseAPI } from "../utils/response.js";
import cookie from 'cookie';
import jwt from 'jsonwebtoken';

function authenticateToken(req, res, next) {
    // const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
    // const token = cookies.accessToken;

    // if (token.length === 0) return responseAPI(res, false, 401, "No token provided");

    let cookies = {};
    try {
        cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
    } catch (err) {
        return responseAPI(res, false, 400, "Error parsing cookies");
    }

    const token = cookies.accessToken;
    if (!token) return responseAPI(res, false, 401, "No token provided");

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return responseAPI(res, false, 400, "Failed to authenticate token");
        if (decoded) {
            if (decoded.exp < Date.now() / 1000) {
                return responseAPI(res, false, 401, "Token expired");
            }
            req.userId = decoded.id
            req.role = decoded.role
            next();
        }
    });
}

export { authenticateToken }