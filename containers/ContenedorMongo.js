const {CarritosDAO, ProductosDAO} = require('../config/MongoDB/mongoConnection')
class Carritos {
    constructor  () {
       
       this.database = CarritosDAO
       
   }

   getAll(){
       return  this.database.find({});
   }

   find(_id) {
       
       console.log("id",_id);
       return this.database.findById({_id},{"productos":1});
   }

   async post(newCart) {
       let cart = {
           timestamp: Date.now(),
           ...newCart,
           
       }
       await this.database.create(cart);
       return cart;
   }

   async addProducts(_id,newProducts) {
       /*let indexCart = this.database.findIndex((item) => item.id === parseInt(id))
   
       let cartProducts = this.database[indexCart].productos
       newProducts.forEach(e=>cartProducts.push(e))
       this.database[indexCart].productos=cartProducts*/
       await this.database.findOneAndUpdate({_id},{$push:{"productos":newProducts}});

       return newProducts;
   }

    deleteCart(_id) {
    console.log("id",_id);
    return this.database.deleteOne({_id});
   }

   deleteProduct(idCart,idProduct) {
    
    return  this.database.findOneAndUpdate({_id:idCart},{$pull:{"productos":{_id:idProduct}}});
       
   }

}


class Productos {
   constructor () {
       this.database =  ProductosDAO
   }


   getAll(){
        return  this.database.find({});
   }
   find(_id) {
        console.log("id",_id);
        return this.database.findById({_id});
   }

   async post(newProduct) {

        let product = {
            timestamp: Date.now(),
            ...newProduct,
            
        }
        return await this.database.create(product);

   }

   delete(_id) {
        console.log("id",_id);
        return this.database.deleteOne({_id});
   }

   async update(_id,body) {

        let updatedProduct = { 
            timestamp: Date.now(),
            ...body
        };
        return await this.database.findOneAndUpdate({_id},{$set:updatedProduct});

   }
}

module.exports = {Carritos,Productos}