import * as ProductService from "../services/productServices.js";


const getAll = async (req,res)=>{
    
    res.json(await ProductService.getAllProducts());
    
}

const find = async (req,res)=>{
    
    const producto = await ProductService.getProductById(req.params.id);
    console.log(producto);
    res.json(producto);
}

const post = async (req,res)=>{
    
    const newProduct = await ProductService.createProduct(req.body)
  
    res.json(newProduct);
}

const deleteProduct = async (req,res)=>{
    
    const producto= await ProductService.deleteProductById(req.params.id);
    res.json(producto);
}

const update = async (req,res)=>{
    
    const updatedProduct= await ProductService.updateProductById(req.params.id,req.body);
    res.json(updatedProduct);
}




export default {getAll,find, post, deleteProduct, update}