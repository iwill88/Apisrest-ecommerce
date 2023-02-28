import { Router } from "express";

import orderController from "../controllers/orderController.js";
import  roleVerification  from "../middlewares/roleVerification.js";

let db
db= orderController

const routerOrders = Router();

routerOrders.get('/:id_user',  roleVerification, db.findOrderbyId);

routerOrders.post('/createOrder',  roleVerification, db.createOrder);

export default routerOrders