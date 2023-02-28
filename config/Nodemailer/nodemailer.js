
import { createTransport } from "nodemailer";

import dotenv from "dotenv"
dotenv.config()

const transporter = createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.EMAIL_MAILER,
        pass: process.env.PASS_MAILER
    }
});

export {transporter}

