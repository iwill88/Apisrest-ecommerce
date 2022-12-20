const express = require("express");
const { Router } = require("express");

require('dotenv').config()

let db
const SOURCE = process.env.SOURCE
if  (SOURCE === "Memoria") {
    const {CarritoDaoMem} = require("../daos/index")
    db = CarritoDaoMem
  }

if  (SOURCE === "Mongo") {
    const {CarritoDaoMongo} = require("../daos/index")
    db = CarritoDaoMongo
 }

if  (SOURCE === "Firebase") {
    const {CarritoDaoFirebase} = require("../daos/index")
    db = CarritoDaoFirebase
 }

 if  (SOURCE === "Archivo") {
    const {CarritoDaoArchivo} = require("../daos/index")
    db = CarritoDaoArchivo
 }




const roleVerificacion= require("../middlewares/roleVerification");

const routerCarrito = express.Router();



routerCarrito.get('/', roleVerificacion,  db.getAllCarrito);

routerCarrito.get('/:id/productos', roleVerificacion, db.getCarrito);

routerCarrito.post ('/', roleVerificacion, db.postCarrito);

routerCarrito.post('/:id/productos',roleVerificacion,  db.addProducts);

routerCarrito.delete('/:id', roleVerificacion, db.deleteCart);

routerCarrito.delete('/:id/productos/:id_prod', roleVerificacion,  db.deleteProduct);


module.exports = routerCarrito;