import { Router } from 'express';
import { checkAuthentication } from "../../middlewares/index.js"
import { sendVerify, authenticateEmail, verify, logOut, getUser } from "../../controller/verify/index.js"


const VerifyRoutes = Router();

VerifyRoutes.post('/send-email', sendVerify)
VerifyRoutes.post('/verify-email', verify)
VerifyRoutes.post('/login', authenticateEmail)
VerifyRoutes.post('/logout', logOut)
VerifyRoutes.get('/user', checkAuthentication, getUser)

export default VerifyRoutes;