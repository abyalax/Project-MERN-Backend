import jwt from "jsonwebtoken";
import { responseDenied, responseFailed } from "./response";

export const verifyToken = (req, res, callback) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(decoded) {
                callback(decoded);
            } else {
                return responseFailed(res)
            }
        })
    } else {
        return responseDenied(res)
    }
}