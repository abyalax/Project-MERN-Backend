export const verifyToken = (req, res, next) => {
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
            req.id = decoded.id;
            next();
        }
    });
};
