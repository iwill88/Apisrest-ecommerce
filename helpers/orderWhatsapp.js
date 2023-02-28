import { cliente } from "../config/Twilio/twilio.js";

import dotenv from "dotenv"
dotenv.config()

const sendingPhone = process.env.SENDING_PHONE_WS
const adminPhone = process.env.ADMIN_PHONE

const orderWhatsapp = (name,email) => {

    try {
        cliente.messages.create({
            body: `Nuevo pedido de ${name}/${email}`,
            from: `whatsapp:${sendingPhone}`,
            to: `whatsapp:${adminPhone}`
        })
        console.log("enviado")
    } catch (err) {
        console.log(err)
    }
   
}

export {orderWhatsapp}