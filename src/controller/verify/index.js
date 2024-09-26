import sendMail from '../../services/mail.services.js';
import User from '../../models/schema/user.js';
import passport from 'passport';
import generateHash from "../../utils/generate-hash.js"

const sendVerificationEmail = async ({
    to,
    verificationHash,
    email
}) => {
    const linkAddress = `http://localhost:5173/auth/verify-email?code=${verificationHash}&email=${email}`
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
        // Validasi email
        if (!req.body.email) {
            return res.status(400).send({ error: "Email is required" });
        }

        const emailVerificationHash = generateHash();

        // Membuat user baru dengan data yang valid
        const password = req.body.password || "defaultPassword"; // Ganti dengan cara mendapatkan password yang tepat
        const user = new User({
            email: req.body.email,
            username: req.body.username,
            name: req.body.name,
            verifiedEmail: false,
            emailVerificationHash,
            password // Pastikan untuk menyertakan password di sini
        });

        // Mendaftarkan user dengan password
        await User.register(user, password);

        // Mengupdate user dengan emailVerificationHash jika tidak tersimpan
        user.emailVerificationHash = emailVerificationHash; // Pastikan hash disimpan di objek user

        // Simpan user ke database
        await user.save().then(() => console.log("user saved")).catch((err) => console.log("Gagal menyimpan user" + err));

        // Mengirim email verifikasi
        await sendVerificationEmail({
            to: req.body.email,
            verificationHash: emailVerificationHash,
            email: req.body.email
        });

        // Sukses
        res.status(200).send({ data: "ok" });
    } catch (err) {
        console.log(err);
        res.status(400).send({ error: err.message });
    }
};



const verify = async (req, res) => {
    try {
        // Mencari akun berdasarkan email dan kode verifikasi
        const account = await User.findOne({
            email: req.body.email,
            emailVerificationHash: req.body.code,
        });

        // Jika akun tidak ditemukan
        if (!account) {
            return res.status(400).send({ error: "Account not found" });
        }

        // Jika akun sudah terverifikasi
        if (account.verifiedEmail) {
            return res.status(200).send({ data: "already verified" });
        }

        // Mengupdate status verifiedEmail
        const updateResult = await User.updateOne(
            { _id: account._id }, // Menggunakan _id dari akun
            { $set: { verifiedEmail: true } }
        );

        // Memastikan update berhasil
        if (updateResult.nModified === 0) {
            return res.status(400).send({ error: "Failed to update verification status" });
        }

        // Respon jika verifikasi berhasil
        return res.status(200).send({ data: "done" });
    } catch (err) {
        console.error(err); // Mencetak error ke konsol untuk debugging
        return res.status(500).send({ error: "Internal server error" });
    }
};


const authenticateEmail = async (req, res, next) => {
    // Ambil email dari request body
    const email = req.body.email;
    // Ambil bagian username sebelum tanda "@"
    const username = email.split('@')[0];

    // Assign username ke req.body agar passport-local bisa menggunakan 'username' field
    req.body.username = username;

    passport.authenticate('local', (err, user) => {
        if (err) return next(err);
        if (!user) return res.status(400).send({ data: "no user" });

        req.logIn(user, function (err) {
            if (err) {
                return res.status(400).send({ data: "error" });
            }
            return res.status(200).send({ data: "ok" });
        });
    })(req, res, next);
};

const getUser = (req, res) => {
    console.log(req.session, 'sesion', req.user)
    res.status(200).send({ data: req.user })
}

const logOut = async (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).send({ message: 'Error logging out' });
        }
        res.status(200).send({ message: 'Logged out successfully' });
    });
}

export { sendVerify, verify, authenticateEmail, logOut, getUser }