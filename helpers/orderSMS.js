import { cliente } from "../config/Twilio/twilio.js";

import dotenv from "dotenv"
dotenv.config()

const sendingPhone = process.env.SENDING_PHONE 

const orderSMS = (userPhone) => {

    try {
        cliente.messages.create({
            body: "Su pedido ha sido recibido y se encuentra en proceso. Muchas gracias",
            from: sendingPhone,
            to: userPhone
        })
        console.log("enviado")
    } catch (err) {
        console.log(err)
    }
   
}

export {orderSMS}
