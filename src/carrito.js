const express = require("express");
const { Router } = require("express");
const {postCarrito, getAllCarrito, getCarrito, addProducts, deleteCart, deleteProduct} = require("../controllers/controll-carrito");
const roleVerificacion= require("../middlewares/roleVerification");

const routerCarrito = express.Router();



routerCarrito.get('/', roleVerificacion,  getAllCarrito);

routerCarrito.get('/:id/productos', roleVerificacion, getCarrito);

routerCarrito.post ('/', roleVerificacion, postCarrito);

routerCarrito.post('/:id/productos',roleVerificacion,  addProducts);

routerCarrito.delete('/:id', roleVerificacion, deleteCart);

routerCarrito.delete('/:id/productos/:id_prod', roleVerificacion,  deleteProduct);


module.exports = routerCarrito;