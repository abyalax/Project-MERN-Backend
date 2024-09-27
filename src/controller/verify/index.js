import sendMail from '../../services/mail.services.js';
import generateHash from "../../utils/generate-hash.js"
import Verification from "../../models/schema/verify-email.js"
import { responseInternalServerError, responseNotFound, responseSuccess } from '../../utils/response.js';

const sendVerificationEmail = async ({
    to,
    verificationHash,
    email
}) => {
    const linkAddress = `http://localhost:5173/auth/register?code=${verificationHash}&email=${email}`
    return await sendMail({
        to,
        subject: "Please verify your email",
        text: `Hi John,
    \nPlease click on the following link to verify your email:
    \n${linkAddress}
    \n
    \nSincerely,
    Tokopedia Team`,
        html: `Hi John,
    <br>Please click on the following link to verify your email:
    <br><a href="${linkAddress}">${linkAddress}</a>
    <br><br>Sincerely,
    <br>The Demo App Team`
    });
}

const sendVerify = async (req, res) => {
    try {
        if (!req.body.email) {
            return res.status(400).send({ error: "Email is required" });
        }

        const emailVerificationHash = generateHash();

        // Simpan di tabel `Verification` sementara
        const verification = new Verification({
            email: req.body.email,
            verificationHash: emailVerificationHash,
            expiresAt: Date.now() + 3600000, // Token berlaku 1 jam
        });

        if (!verification) {
            console.log("Failed to save verification");

        }

        await verification.save();

        await sendVerificationEmail({
            to: req.body.email,
            verificationHash: emailVerificationHash,
            email: req.body.email
        });

        return responseSuccess(res);
    } catch (err) {
        console.log(err);
        res.status(400).send({ error: err.message });
    }
};



const verify = async (req, res) => {
    try {
        console.log({
            email: req.body.email,
            verificationHash: req.body.code,
        });
        
        // Temukan di tabel `Verification`
        const verification = await Verification.findOne({
            email: req.body.email,
            verificationHash: req.body.code,
        });

        if (!verification || verification.expiresAt < Date.now()) {
            return responseNotFound(res);
        }

        // Ubah status menjadi `VERIFIED`
        verification.status = 'VERIFIED';
        const update = await verification.save();
        if (update) {
            return responseSuccess(res);
        }
    } catch (err) {
        console.error(err);
        return responseInternalServerError(res);
    }
};

export { sendVerify, verify }