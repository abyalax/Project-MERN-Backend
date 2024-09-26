import nodemailer from "nodemailer"
const sendMail = async ({ subject, to, html, text }) => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD
      }
    });

    return await transporter.sendMail({
      from: {
        name: "Tokopedia",
        address: process.env.GMAIL_USERNAME
      },
      to,
      subject,
      text,
      html,
    });
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error("Email sending failed");
  }
}
export default sendMail