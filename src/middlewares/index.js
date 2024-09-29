import { responseDenied, responseUnauthenticated } from "../utils/response";

function authenticateToken(req, res) {
    const authCookie = req.cookies['authcookie'];
    if (authCookie == null) return responseDenied(res)
    jwt.verify(authCookie, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return responseDenied(res)
        req.user = user;
        next();
    })
}

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
       return responseUnauthenticated(res)
    }
}

export { authenticateToken, checkAuthentication }