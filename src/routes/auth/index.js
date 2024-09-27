import { Router } from 'express';
import { checkAuthentication } from "../../middlewares/index.js"
import { login, register, getUser } from "../../controller/auth/index.js";

const AuthRoute = Router();

AuthRoute.post('/login', login);
AuthRoute.post('/register', register);
AuthRoute.get('/user', checkAuthentication, getUser)

export default AuthRoute;