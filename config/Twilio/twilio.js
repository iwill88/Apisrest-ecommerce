import twilio from "twilio"


const authToken = process.env.TWILIO
const accountSID = "ACd8a468e073513b7569f440b562204c72"

const cliente = twilio(accountSID, authToken)

export {cliente}


