import sendMail from '../../services/mail.services.js';
import generateHash from "../../utils/generate-hash.js"
import Verification from "../../models/schema/verify-email.js"
import { responseAPI, responseInternalServerError, responseNotFound, responseSuccess, responseError } from '../../utils/response.js';

const sendVerificationEmail = async ({
    to,
    verificationHash,
    email
}) => {
    const origin = process.env.ORIGIN || 'http://localhost:5173';
    const linkAddress = `${origin}/auth/register?code=${verificationHash}&email=${email}`
    const name = email.split("@")[0]
    return await sendMail({
        to,
        subject: "Please Verify Your Email",
        text: `Hi ${name},
    \nPlease click on the following link to verify your email:
    \n${linkAddress}
    \n
    \nSincerely,
    Tokopedia Team`,
        html: `Hi ${name},
    <br>Please click on the following link to verify your email:
    <br><a href="${linkAddress}">${linkAddress}</a>
    <br><br>Sincerely,
    <br>The Demo App Team`
    });
}

const sendVerify = async (req, res) => {
    try {
        if (!req.body.email) {
            return responseAPI(res, false, 400, "Email is required");
        }
        const emailVerificationHash = generateHash();
        const verification = new Verification({
            email: req.body.email,
            verificationHash: emailVerificationHash,
            expiresAt: Date.now() + 3600000, // Token berlaku 1 jam
        });
        if (!verification) return responseAPI(res, false, 400, "Verification failed");
        const save = await verification.save();
        if (!save) return responseAPI(res, false, 400, "Failed save verification");
        const send = await sendVerificationEmail({
            to: req.body.email,
            verificationHash: emailVerificationHash,
            email: req.body.email
        });
        if (!send) return responseAPI(res, false, 400, "Failed send verification email");
        return responseSuccess(res);
    } catch (err) {
        return responseError(res, err)
    }
};



const verify = async (req, res) => {
    try {
        const verification = await Verification.findOne({
            email: req.body.email,
            verificationHash: req.body.code,
        });
        if (!verification || verification.expiresAt < Date.now()) {
            return responseNotFound(res);
        }
        verification.status = 'VERIFIED';
        const update = await verification.save();
        if (update) {
            return responseSuccess(res);
        } else {
            return responseAPI(res, false, 400, "Failed update verification");
        }
    } catch (err) {
        return responseError(res, err)
    }
};

export { sendVerify, verify }