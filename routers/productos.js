
import { Router } from "express"

import dotenv from "dotenv"
dotenv.config()

import productController from "../controllers/productController.js"
import roleVerification from "../middlewares/roleVerification.js"

let db 

db=productController



const routerProductos = Router();




routerProductos.get('/',  roleVerification, db.getAll);

routerProductos.get('/:id', roleVerification, db.find);

routerProductos.post ('/', roleVerification, db.post)

routerProductos.delete('/:id', roleVerification, db.deleteProduct);

routerProductos.put('/:id', roleVerification, db.update);

export default routerProductos;