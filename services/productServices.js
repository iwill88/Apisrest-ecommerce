import { Product } from '../models/productSchema.js';
import { loggerError } from "../loggers/loggers.js";
import ProductDaoMongoDb from '../daos/ProductMongoDao.js';

let ProductDAO = new ProductDaoMongoDb()


     const getAllProducts = async () => {

     try {
          return  await ProductDAO.getAll();
     } catch (err) {
          console.log(err)
     }
        
   }
   const getProductById = async (id) => {

     try {
          console.log("id",id);
          return  await ProductDAO.getById(id);
     } catch (err) {
          console.log(err)
     }
        

        
   }

   const  createProduct = async(newProduct) => {


     try {
          let product = {
               timestamp:new Date().toISOString(),
               ...newProduct,
               
           }
           return await ProductDAO.save(product);
     } catch (err) {
          console.log(err)
     }
        

        

   }

   const deleteProductById = async(id) =>{

     try {
          console.log("id",id);
        return await ProductDAO.deleteById(id);
     } catch (err) {
          console.log(err)
     }
        

        
   }

   const  updateProductById = async(id,body) => {
     
     try {
          let updatedProduct = { 
               timestamp: new Date().toISOString(),
               ...body
           };
           return await ProductDAO.updateById(id,updatedProduct)
     } catch (err) {
          console.log(err)
     }
        
   }


export  {
     getAllProducts,
     getProductById,
     createProduct,
     deleteProductById,
     updateProductById
}