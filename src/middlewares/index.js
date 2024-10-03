import { responseUnauthenticated } from "../utils/response.js";
import cookie from 'cookie';
import jwt from 'jsonwebtoken';

function authenticateToken(req, res, next) {
    const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
    const token = cookies.accessToken;

    if (!token) {
        return next(new Error('No token provided'));
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return next(new Error('Failed to authenticate token'));
        }
        if (decoded) {
            if (decoded.exp < Date.now() / 1000) {
                return next(new Error('Token expired'));
            }
            console.log("Decoded: ", decoded);
            req.userId = decoded.id
            req.role = decoded.role
            console.log("Role: ", req.role);
            console.log("ID user: ", req.userId);
            
            next();
        }
    });
}

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        return responseUnauthenticated(res)
    }
}

export { authenticateToken, checkAuthentication }