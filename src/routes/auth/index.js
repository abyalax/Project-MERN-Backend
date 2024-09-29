import { Router } from 'express';
import { getUser, login, Logout, register } from "../../controller/auth/index.js";

const AuthRoute = Router();

AuthRoute.post('/login', login);
AuthRoute.post('/register', register);
AuthRoute.get('/user', getUser);
AuthRoute.post('/logout', Logout);

export default AuthRoute;