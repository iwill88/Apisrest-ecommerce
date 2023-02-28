import { transporter } from "../config/Nodemailer/nodemailer.js";
import path from "path";
import ejs from "ejs"

const __dirname = path.resolve()

import dotenv from "dotenv"
dotenv.config()

const sendOrderMailer = async (order, user) => {


    const templatePath = path.join(__dirname, "../Apirestful/views/pages/orderMail.ejs")

    const data = await ejs.renderFile(templatePath, {
          totalQty:order.totalQty,
          subTotal:order.subTotal, 
          orderBy: order.orderBy,
          productos: order.productos
         
    })

    const opts = {
        from: process.env.EMAIL_MAILER,
        to: process.env.EMAIL_MAILER,
        subject: `Nuevo pedido de ${user.name}/${user.email}`,
        html: data,
    }

    await transporter.sendMail(opts)

}

export {sendOrderMailer}