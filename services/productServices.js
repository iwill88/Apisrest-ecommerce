import { Product } from '../models/productSchema.js';
import { loggerError } from "../loggers/loggers.js";
import { ProductDAO } from '../daos/index.js';


export default class ProductService {
     
     constructor() {
          this.dao = ProductDAO
     }

     async getAllProducts () {

          try {
               const products = await this.dao.getAll();
               if(!products) {
                    loggerError.error(`No se encontraron los productos`);
                    throw new Error(`No se encontraron los productos`);
               }
               return products
          } catch (err) {
               loggerError.error(`No se encontraron los productos: ${err}`);
               throw err;
          }    
        }

     async getProductById (id) {
     
          try {
               const product = await this.dao.getById(id);
               if (!product) {
                    loggerError.error(`No se encontró el producto con ID ${id}`);
                    throw new Error(`No se encontró el producto con ID ${id}`);
               }
               return product;
          } catch (err) {
               loggerError.error(`Se produjo un error al buscar el producto con ID ${id}: ${err}`);
               throw err;
          } 
        }
     
        async createProduct(newProduct) {
          try {
               let data = {
                    timestamp:new Date().toISOString(),
                    ...newProduct,  
                }
                const product = await this.dao.save(data);
                if (!product) {
                    loggerError.error(`No se creo el producto correctamente`);
                    throw new Error(`No se creo el producto correctamente`);
                }
                return product
          } catch (err) {
               loggerError.error(`Se produjo un error al intentar crear un nuevo producto: ${err}`);
               throw err;
          }
        }
     
        async deleteProductById (id) {
          try {
              
             const result = await this.dao.deleteById(id)
             if (!result){
               loggerError.error(`No se borro el producto correctamente con ID ${id}`);
               throw new Error(`No se borro el producto correctamente con ID ${id}`);
             }
             return 
          } catch (err) {
               loggerError.error(`Se produjo un error al intentar borrar el producto con ID ${id}: ${err}`);
               throw err;
          }
        }
     
        async updateProductById (id,body) {
          try {
               let updatedProduct = { 
                    timestamp: new Date().toISOString(),
                    ...body
                };
               const result = await this.dao.updateById(id,updatedProduct)
               if (!result) {
                    loggerError.error(`No se actualizó el producto con ID ${id}`);
                    throw new Error(`No se actualizó el producto con ID ${id}`);
                  }
               return await this.dao.getById(id)
                 
          } catch (err) {
               loggerError.error(`Se produjo un error al intentar actualizar el producto con ID ${id}: ${err}`);
               throw err;
          }
        }

}

