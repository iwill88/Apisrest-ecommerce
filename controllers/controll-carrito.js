const Carrito = require("../carritoClass");
const db = new Carrito;



const getAllCarrito = async (req,res)=>{
    
    res.json( await db.getAll());
}

const getCarrito = async (req,res)=>{
    

    const carrito = await db.find(parseInt(req.params.id));
    console.log(carrito);
    res.json(carrito);
}

const postCarrito = async (req,res)=>{
    

    const newCarrito= await db.post(req.body)
  
   res.json(newCarrito);
}


const addProducts = async (req,res)=>{
    

    const carrito= await db.addProducts(req.params.id,req.body);
    res.json(carrito);
}

const deleteCart = async (req,res)=>{
    

    const carrito= await db.deleteCart(req.params.id);
    res.json(carrito);
}

const deleteProduct = async (req,res)=>{
    

    const carrito= await db.deleteProduct(req.params.id,req.params.id_prod);
    res.json(carrito);
}


module.exports = {getAllCarrito,getCarrito,postCarrito,addProducts, deleteCart, deleteProduct}