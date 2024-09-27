function authenticateToken(req, res) {
    const authCookie = req.cookies['authcookie'];

    if (authCookie == null) return res.sendStatus(401);

    jwt.verify(authCookie, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        req.user = user;
        next();
    })
}

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).send({ reason: "unauthenticated" });
    }
}

export { authenticateToken, checkAuthentication }