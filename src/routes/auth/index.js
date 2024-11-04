import { Router } from 'express';
import { authenticateToken } from "../../middlewares/index.js"
import { getUser, login, register } from "../../controller/auth/index.js";

const AuthRoute = Router();

AuthRoute.post('/login', login);
AuthRoute.post('/register', register);
AuthRoute.get('/user', authenticateToken, getUser);

export default AuthRoute;