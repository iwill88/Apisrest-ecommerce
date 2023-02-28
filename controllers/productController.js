import { ProductService } from "../services/productServices.js";

const ProductController = new ProductService;


const getAll = async (req,res)=>{
    
    res.json(await ProductController.getAll());
    
}

const find = async (req,res)=>{
    
    const producto = await ProductController.find(req.params.id);
    console.log(producto);
    res.json(producto);
}

const post = async (req,res)=>{
    
    const newProduct = await ProductController.post(req.body)
  
    res.json(newProduct);
}

const deleteProduct = async (req,res)=>{
    
    const producto= await ProductController.delete(req.params.id);
    res.json(producto);
}

const update = async (req,res)=>{
    
    const updatedProduct= await ProductController.update(req.params.id,req.body);
    res.json(updatedProduct);
}




export default {getAll,find, post, deleteProduct, update}