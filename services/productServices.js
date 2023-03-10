import { Product } from '../models/productSchema.js';
import { loggerError } from "../loggers/loggers.js";
import { ProductDAO } from '../daos/index.js';


export default class ProductService {
     
     constructor() {
          this.dato = ProductDAO
     }

     async getAllProducts () {

          try {
               return  await this.dato.getAll();
          } catch (err) {
               console.log(err)
          }    
        }

     async getProductById (id) {
     
          try {
               console.log("id",id);
               return  await this.dato.getById(id);
          } catch (err) {
               console.log(err)
          } 
        }
     
        async createProduct(newProduct) {
          try {
               let product = {
                    timestamp:new Date().toISOString(),
                    ...newProduct,  
                }
                return await this.dato.save(product);
          } catch (err) {
               console.log(err)
          }
        }
     
        async deleteProductById (id) {
          try {
               console.log("id",id);
             return await this.dato.deleteById(id);
          } catch (err) {
               console.log(err)
          }
        }
     
        async updateProductById (id,body) {
          try {
               let updatedProduct = { 
                    timestamp: new Date().toISOString(),
                    ...body
                };
                return await this.dato.updateById(id,updatedProduct)
          } catch (err) {
               console.log(err)
          }
        }

}

