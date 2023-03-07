import {Router} from "express"

import dotenv from "dotenv"
dotenv.config()

import cartController from "../controllers/cartController.js";
import  roleVerification  from "../middlewares/roleVerification.js";

let db
db= cartController


const routerCarrito = Router();


routerCarrito.get('/',  roleVerification, db.getAllCarrito);

routerCarrito.get('/:id/productos', roleVerification, db.getCarrito);

routerCarrito.post ('/', roleVerification, db.postCarrito);

routerCarrito.post('/:id/productos',  roleVerification, db.addProducts);

routerCarrito.post ('/addProduct', roleVerification, db.addProduct);

routerCarrito.get ('/:id_user', roleVerification, db.getCartbyUser);

routerCarrito.post ('/updateCant/:id_user', roleVerification, db.updateProductQuantity);

routerCarrito.post ('/removeProd/:id_user', roleVerification, db.removeProduct);

routerCarrito.post ('/emptyCart/:id_user', roleVerification, db.emptyCart);

routerCarrito.delete('/:id', roleVerification, db.deleteCart);

//routerCarrito.delete('/:id/productos/:id_prod', roleVerification, db.deleteProduct);


export default routerCarrito;