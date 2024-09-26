import { Router } from 'express';
import { login, register } from "../../controller/auth/index.js";

const AuthRoute = Router();

AuthRoute.post('/login', login);
AuthRoute.post('/register', register);

export default AuthRoute;