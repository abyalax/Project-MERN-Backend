import { Router } from 'express';
import { sendVerify, verify } from "../../controller/verify/index.js"


const VerifyRoutes = Router();

VerifyRoutes.post('/send-email', sendVerify)
VerifyRoutes.post('/verify-email', verify)

export default VerifyRoutes;