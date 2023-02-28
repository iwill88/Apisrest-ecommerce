import { CartService } from "../services/cartServices.js";

const CartController = new CartService;

const getAllCarrito = async (req,res)=>{
    
    res.json( await CartController.getAll());
}

const getCarrito = async (req,res)=>{
    

    const carrito = await CartController.find(req.params.id);
    console.log(carrito);
    res.json(carrito);
}

const postCarrito = async (req,res)=>{
    

    const newCarrito= await CartController.post(req.body)
  
   res.json(newCarrito);
}


const addProducts = async (req,res)=>{
    

    const carrito= await CartController.addProducts(req.params.id,req.body);
    res.json(carrito);
}

const deleteCart = async (req,res)=>{
    

    const carrito= await CartController.deleteCart(req.params.id);
    res.json(carrito);
}

const deleteProduct = async (req,res)=>{
    

    const carrito= await CartController.deleteProduct(req.params.id,req.params.id_prod);
    res.json(carrito);
}


const getCartbyUser = async (req,res) => {
    const carrito = await CartController.getCart(req.params.id_user)
    res.json(carrito)
}

const addProduct = async (req,res) => {
    const carrito =  await CartController.addProduct(Number(req.body.quantity), req.body.id_prod, req.body.id_user)
    res.redirect("/products")
    //res.json(carrito)
}

const updateProductQuantity = async (req, res) => {
    const carrito =  await CartController.updateProductQuantity(req.body.value, req.body.id_prod, req.params.id_user)
    res.json(carrito)
}

const removeProduct = async (req, res) => {
    const carrito =  await CartController.removeProduct(req.body.id_prod, req.params.id_user)
    res.json(carrito)
}

const emptyCart = async (req, res) => {
    const carrito =  await CartController.emptyCart(req.params.id_user)
    res.json(carrito)
}


export default {
    getAllCarrito,
    getCarrito,
    postCarrito,
    addProducts, 
    deleteCart,
    deleteProduct, 
    getCartbyUser, 
    addProduct, 
    updateProductQuantity, 
    removeProduct,
    emptyCart
}