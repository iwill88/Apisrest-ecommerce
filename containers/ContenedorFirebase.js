var admin = require("firebase-admin");
const {FieldValue} = require('../config/Firebase/firebaseConnection')
const db = admin.firestore();
class Carritos {
    constructor  () {
       
       this.database = db.collection("carritos")
       
   }

   async getAll(){
        const snapshot = await this.database.get();
        console.log("type offffffffff", typeof snapshot)
        const array = []
        snapshot.forEach(doc => {
            console.log({ id: doc.id, ...doc.data() })
            array.push({ id: doc.id, ...doc.data() })
        })
        return array

         
   }

   async find(id) {

        const queryProduct = await this.database.doc(id)
        const product = await queryProduct.get()
        const productFinal = product.data()
        const productos = productFinal.productos
        return productos

       
   }

   async post(newCart) {
       let cart = {
           timestamp: Date.now(),
           ...newCart,
           
       }

       await this.database.add(cart)
     
       return cart;
   }

   async addProducts(id,newProducts) {

    const carrito = await  this.database.doc(id)
    const nuevosProductos = newProducts
    await carrito.update({ productos: FieldValue.arrayUnion(...nuevosProductos)})
    return newProducts;
   }

    async deleteCart(id) {
    console.log("id",id);
    const queryProduct = await this.database.doc(id)
    
    return await queryProduct.delete()
   }

   async deleteProduct(idCart,idProduct) {
    
    const queryProducts = await this.database.doc(idCart)
    const products = await queryProducts.get()
    const producstData =  products.data().productos
    
    const array = producstData.filter(prod => prod.id !== parseInt(idProduct))
   
    return await queryProducts.update({productos:array})

      
       
   }

}


class Productos {
   constructor () {
        this.database = db.collection("productos")
   }


   async getAll(){
        const snapshot = await this.database.get();
        const array = []
        snapshot.forEach(doc => {
            console.log({ id: doc.id, ...doc.data() })
            array.push({ id: doc.id, ...doc.data() })
        })
        return array
   }
   async find(id) {
        const queryProduct = await this.database.doc(id)
        const product = await queryProduct.get()
        const productFinal = product.data()
        return productFinal
   }

   async post(newProduct) {

        let product = {
            timestamp: Date.now(),
            ...newProduct,
            
        }
        await this.database.add(product);

        return product;

   }

   async delete(id) {
        console.log("id",id);
        const queryProduct = await this.database.doc(id)
        
        return await queryProduct.delete()
   }

   async update(id,body) {

        let updatedProduct = { 
            timestamp: Date.now(),
            ...body
        };

        const queryProduct = await this.database.doc(id)
        await queryProduct.update(updatedProduct)
        const product = await queryProduct.get()
        const productData =  product.data()
        return productData

   }
}

module.exports = {Carritos,Productos}