import { Cart } from '../models/cartSchema.js';
import { Product } from '../models/productSchema.js';
import { User } from '../models/userSchema.js';
import { loggerError } from "../loggers/loggers.js";


class CartService {
    constructor  () {
       
       this.databaseCart = Cart
       this.databaseProduct = Product
       this.databaseUser = User
       
   }

   getAll(){

      try {
        return  this.databaseCart.find({});
      } catch (err) {
        console.log(err)

      }

      
   }

   find(_id) {
       
    try {
      console.log("id",_id);
       return this.databaseCart.findById({_id},{"productos":1});
    } catch (err) {
      console.log(err)

    }


       
   }

   async post(newCart) {

    try {
      let cart = {
        timestamp: new Date().toISOString(),
        ...newCart,
        
    }
    await this.databaseCart.create(cart);
    return cart;
    } catch (err) {
      console.log(err)

    }

   }

   async addProducts(_id,newProducts) {

      try {

        await this.databaseCart.findOneAndUpdate({_id},{$push:{"productos":newProducts}});
        return newProducts;

      } catch (err) {
        console.log(err)

      }


       
   }

    deleteCart(_id) {

      try {
        console.log("id",_id);
        return this.databaseCart.deleteOne({_id});
      } catch (err) {
        console.log(err)
      }

    
   }

   deleteProduct(idCart,idProduct) {

      try {
        return  this.databaseCart.findOneAndUpdate({_id:idCart},{$pull:{"productos":{_id:idProduct}}});

      } catch (err){
        console.log(err)

      }

    
       
   }

   async getCart(id_user) {

    try {
      const owner = id_user
      return await this.databaseCart.findOne({ owner }).populate({
          path: "productos",
          populate: {
            path: "item",
          },
        })
    } catch (err) {
      console.log(err)

    }

   }


   async addProduct(quantity,id_prod,id_user) {
     
     const owner = id_user;

      const cart = await this.databaseCart.findOne({ owner }).populate({
        path: "productos",
        populate: {
          path: "item",
        },
      });
            
      const user = await this.databaseUser.findById(owner);
  
      const foundProduct = await this.databaseProduct.findById(id_prod);


      let products = [];
  
      let object = {};

      if (cart) {

        const duplicatedProduct = cart.productos.find(item => item.item._id.toString() === foundProduct._id.toString());


        if (duplicatedProduct) {
            duplicatedProduct.quantity = duplicatedProduct.quantity + quantity;
            duplicatedProduct.total = duplicatedProduct.total + duplicatedProduct.item.price * quantity;
  

            cart.totalQty = cart.totalQty + quantity;
  
            let cartTotal = 0;

            cart.productos.forEach((item) => {
                cartTotal = cartTotal + item.total;
              });
      
              cart.subTotal = cartTotal;
      
            return await cart.save();

        }
        
        (object.item = foundProduct._id),
          (object.quantity = quantity),
          (object.total = foundProduct.price * quantity);
  
        cart.productos.push(object);
        cart.totalQty = cart.totalQty + quantity;
        cart.subTotal = cart.subTotal + foundProduct.price * quantity;
  
        return await cart.save();

      } else {
        (object.item = foundProduct._id),
          (object.quantity = quantity),
          (object.total = foundProduct.price * quantity);
          products.push(object);
  
        let subTotal = 0;
  
        products.forEach((item) => {
          subTotal = subTotal + item.total;
        });
  
        let totalQty = 0;
  
        products.forEach((item) => {
          totalQty = totalQty + item.quantity;
        });
  
        const newCart = await new Cart({
          timestamp: new Date().toISOString(),
          owner,
          productos:products,
          subTotal,
          totalQty,
        });
  
        const savedCart = await newCart.save();
  
        user.cart = savedCart._id;
  
        return await user.save();
  
      }

   }

   async updateProductQuantity(value, id_prod, id_user)  {
    const owner = id_user;
  
  
    try {
      const product = await this.databaseProduct.findById(id_prod);
  
      const cart = await this.databaseCart.findOne({ owner }).populate({
        path: "productos",
        populate: {
          path: "item",
        },
      });
  
      if (!product) {
        console.log("No se encontro el producto" );
      }
  
      if (!cart) {
        console.log("No hay carrito")
      }
  
      const findProduct = cart.productos.find((item) => {
        return   item.item._id.toString() === product.id.toString();
      });
  
      if (value == "add") {
        findProduct.quantity += 1;
        findProduct.total += findProduct.item.price;
  
        let cartTotal = 0;
  
        cart.productos.forEach((item) => {
          cartTotal += item.total;
        });
  
        cart.subTotal = cartTotal;
        cart.totalQty += 1;
      } else if (value =="substract") {
        findProduct.quantity -= 1;
        findProduct.total -= findProduct.item.price;
  
        cart.subTotal -= findProduct.item.price;
        cart.totalQty -= 1;
  
        if (findProduct.quantity === 0) {
          console.log("el producto llego a 0");
  
          const newArray = cart.productos.filter((item) => {
            console.log(item.item._id);
            return findProduct.item._id.toString() !== item.item._id.toString();
          });
  
          cart.productos = newArray;
        }
      }
  
      const newCart = await cart.save();
  
      return newCart 

    } catch (error) {
      console.log("error", error)
    }

  }

  async removeProduct(id_prod,id_user) {
    
    const owner = id_user

    try {
        const cart = await this.databaseCart.findOne({ owner }).populate({
          path: "productos",
          populate: {
            path: "item",
          },
        });
    
        const product = await this.databaseProduct.findById(id_prod);
    
        if (!product) {
            console.log("No se encontro el producto" );
          }
      
        if (!cart) {
            console.log("No hay carrito")
          }
    
        const itemIndex = cart.productos.findIndex((item) => {
          return  item.item._id.toString()  ===  product._id.toString() 
        });

        console.log("index",itemIndex)
    
        const newArray = cart.productos.filter((item) => {
          return  item.item._id.toString() !== product._id.toString()
        });
    
        cart.totalQty = cart.totalQty - cart.productos[itemIndex].quantity;
        cart.subTotal = cart.subTotal - cart.productos[itemIndex].total;
        cart.productos = newArray;
    
        const newCart = await cart.save();

        return newCart

      } catch (err) {
        
        console.log(err)
      }

  }

  async emptyCart(id_user) {
    const owner = id_user;

    try {
        const cart = await this.databaseCart.findOne({ owner });

        cart.productos = [];
        cart.subTotal = 0;
        cart.totalQty = 0;

        const savedCart = await cart.save();

        return savedCart

    } catch (err) {
      console.log(err)

    
    };
    
    }
}

export  {CartService}





















