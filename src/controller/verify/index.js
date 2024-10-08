import sendMail from '../../services/mail.services.js';
import generateHash from "../../utils/generate-hash.js"
import Verification from "../../models/schema/verify-email.js"
import { responseAPI, responseNotFound, responseSuccess, responseError } from '../../utils/response.js';

const sendVerificationEmail = async ({
    to,
    verificationHash,
    email
}) => {
    const origin = process.env.ORIGIN_DEVELOPMENT || process.env.ORIGIN_PRODUCTION;
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
        if (!req.body.email)
            return responseAPI(res, false, 400, "Email not send to verify");
        console.log("sending verify email", req.body.email);

        const emailAtDB = await Verification.findOne({ email: req.body.email });
        if (emailAtDB) {
            if (emailAtDB.status === 'VERIFIED') {
                console.log(emailAtDB.status);
                return responseAPI(res, false, 409, "Email already verified");
            }
        }
        const emailVerificationHash = generateHash();
        const verification = new Verification({
            email: req.body.email,
            verificationHash: emailVerificationHash,
            expiresAt: Date.now() + 90000, // Token berlaku 1 jam = 3600000, For Testing 1 detik = 1000
        });
        if (!verification) return responseAPI(res, false, 424, "Failed Create Verification");
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
        console.log(err);
        return responseError(res, err)
    }
};



const verify = async (req, res) => {
    if (!req.body.email || !req.body.code) return responseAPI(res, false, 404, "Email and code are empty");
    try {
        const verification = await Verification.findOne({
            email: req.body.email,
            verificationHash: req.body.code,
        });
        if (!verification) {
            return responseAPI(res, false, 404, "Verification not found");
        }
        if (verification.expiresAt < Date.now()) {
            return responseAPI(res, false, 410, "Verification expired");
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