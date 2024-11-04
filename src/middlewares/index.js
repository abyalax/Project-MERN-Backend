import { responseAPI } from "../utils/response.js";
import jwt from 'jsonwebtoken';

function authenticateToken(req, res, next) {

    let token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
        return responseAPI(res, false, 401, "No token provided");
    }

    const frmttoken = token.split(" ")[2];
    console.log(frmttoken);

    jwt.verify(frmttoken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return responseAPI(res, false, 401, "Failed to authenticate token");
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