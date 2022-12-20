const express = require("express");
const { Router } = require("express");

require('dotenv').config()

let db 
const SOURCE = process.env.SOURCE
if  (SOURCE === "Memoria") {
     const {ProductoDaoMem} = require("../daos/index")
     db = ProductoDaoMem
  }

if  (SOURCE === "Mongo") {
    const {ProductoDaoMongo} = require("../daos/index")
     db = ProductoDaoMongo
 }

if  (SOURCE === "Firebase") {
    const {ProductoDaoFirebase} = require("../daos/index")
     db = ProductoDaoFirebase
 }

 if  (SOURCE === "Archivo") {
    const {ProductoDaoArchivo} = require("../daos/index")
     db = ProductoDaoArchivo
 }


const roleVerificacion= require("../middlewares/roleVerification");

const routerProductos = express.Router();

routerProductos.get('/', db.getAll);

routerProductos.get('/:id', roleVerificacion, db.find);

routerProductos.post ('/', roleVerificacion, db.post)

routerProductos.delete('/:id', roleVerificacion, db.deleteProduct);

routerProductos.put('/:id', roleVerificacion, db.update);

module.exports = routerProductos;