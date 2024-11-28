import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config();

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false, // Disable rejection of unauthorized certificates
    },
});



export default transporter;