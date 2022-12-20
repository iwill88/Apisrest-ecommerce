const {Carritos} = require("../../containers/ContenedorArchivo");
const CarritosDAO = new Carritos;

const getAllCarrito = async (req,res)=>{
    
    res.json( await CarritosDAO.getAll());
}

const getCarrito = async (req,res)=>{
    

    const carrito = await CarritosDAO.find(parseInt(req.params.id));
    console.log(carrito);
    res.json(carrito);
}

const postCarrito = async (req,res)=>{
    

    const newCarrito= await CarritosDAO.post(req.body)
  
   res.json(newCarrito);
}


const addProducts = async (req,res)=>{
    

    const carrito= await CarritosDAO.addProducts(req.params.id,req.body);
    res.json(carrito);
}

const deleteCart = async (req,res)=>{
    

    const carrito= await CarritosDAO.deleteCart(req.params.id);
    res.json(carrito);
}

const deleteProduct = async (req,res)=>{
    

    const carrito= await CarritosDAO.deleteProduct(req.params.id,req.params.id_prod);
    res.json(carrito);
}


module.exports = {getAllCarrito,getCarrito,postCarrito,addProducts, deleteCart, deleteProduct}