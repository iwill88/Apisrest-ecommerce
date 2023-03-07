import MongoStore from "connect-mongo";
import session from "express-session";
import * as dotenv from "dotenv";

const MONGO_URL = process.env.MONGO_URL

dotenv.config();
// setteo sesiones
const sessionStore = new MongoStore({
    mongoUrl: MONGO_URL,
    ttl: 6000,
  })

export default session({
    store: sessionStore,
    secret: "shhhhhhhhhhhhhhhhhhhhh",
    resave: true,
    saveUninitialized: true ,
  });

