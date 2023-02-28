import { transporter } from "../config/Nodemailer/nodemailer.js";
import path from "path";
import ejs from "ejs"

const __dirname = path.resolve()

import dotenv from "dotenv"
dotenv.config()


const sendRegister = async (user) => {

    const templatePath = path.join(__dirname, "../Apirestful/views/pages/registerMail.ejs")

    const data = await ejs.renderFile(templatePath, {
          email:user.email,
          name:user.name, 
          address:user.address,
          age:user.age, 
          phone:user.phone, 
          picture: user.picture
    })

    const opts = {
        from: process.env.EMAIL_MAILER,
        to: process.env.EMAIL_MAILER,
        subject: "Nuevo registro",
        html: data,
    }

    await transporter.sendMail(opts)

}

export {sendRegister}