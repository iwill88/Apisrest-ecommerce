const express = require("express");
const { Router } = require("express");
const {getAll,find, post, deleteProduct, update} = require("../controllers/controll-productos");
const roleVerificacion= require("../middlewares/roleVerification");

const routerProductos = express.Router();

routerProductos.get('/', getAll);

routerProductos.get('/:id', roleVerificacion, find);

routerProductos.post ('/', roleVerificacion, post)

routerProductos.delete('/:id', roleVerificacion, deleteProduct);

routerProductos.put('/:id', roleVerificacion, update);

module.exports = routerProductos;