import { Product } from '../models/productSchema.js';
import { loggerError } from "../loggers/loggers.js";


class ProductService {
   constructor () {
       this.database =  Product
   }


     getAll(){

     try {
          return  this.database.find({});
     } catch (err) {
          console.log(err)
     }
        
   }
   find(_id) {

     try {
          console.log("id",_id);
          return this.database.findById({_id});
     } catch (err) {
          console.log(err)
     }
        

        
   }

   async post(newProduct) {


     try {
          let product = {
               timestamp:new Date().toISOString(),
               ...newProduct,
               
           }
           return await this.database.create(product);
     } catch (err) {
          console.log(err)
     }
        

        

   }

   delete(_id) {

     try {
          console.log("id",_id);
        return this.database.deleteOne({_id});
     } catch (err) {
          console.log(err)
     }
        

        
   }

   async update(_id,body) {
     
     try {
          let updatedProduct = { 
               timestamp: new Date().toISOString(),
               ...body
           };
           return await this.database.findOneAndUpdate({_id},{$set:updatedProduct});
     } catch (err) {
          console.log(err)
     }
        


       

   }
}

export  {ProductService}