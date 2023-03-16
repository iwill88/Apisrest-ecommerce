import ProductService from "../services/productServices.js";
import { ProductDTO } from "../dtos/ProductDto.js";

const ProductServices = new ProductService();

const getAll = async (req,res)=>{
    const data = await ProductServices.getAllProducts()
    res.json(data.map((product) => new ProductDTO(product)));
    
}

const find = async (req,res)=>{
    
    const product = await ProductServices.getProductById(req.params.id);
    res.json(new ProductDTO(product));
}

const post = async (req,res)=>{
    
    const newProduct = await ProductServices.createProduct(req.body)
  
    res.json(new ProductDTO(newProduct));
}

const deleteProduct = async (req,res)=>{
    
    await ProductServices.deleteProductById(req.params.id);
    res.json(`Se elimino correctamente el producto con ID ${req.params.id}`);
}

const update = async (req,res)=>{
    
    const updatedProduct= await ProductServices.updateProductById(req.params.id,req.body);
    res.json(new ProductDTO(updatedProduct));
}




export default {getAll,find, post, deleteProduct, update}