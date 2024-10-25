import { responseAPI } from "../utils/response.js";
import jwt from 'jsonwebtoken';

function authenticateToken(req, res, next) {

    const info = req
    console.log({info});
    
    const token = req.cookies.accessToken;
    console.log({token});

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