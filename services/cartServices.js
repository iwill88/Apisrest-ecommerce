import { Cart } from '../models/cartSchema.js';
import { Product } from '../models/productSchema.js';
import { User } from '../models/userSchema.js';
import { loggerError } from "../loggers/loggers.js";
import CartDaoMongoDb from '../daos/CartMongoDao.js';
import ProductDaoMongoDb from '../daos/ProductMongoDao.js';
import UserDaoMongoDb from '../daos/UserMongoDao.js';

let CartDAO = new CartDaoMongoDb();
let ProductDAO = new ProductDaoMongoDb();
let UserDAO = new UserDaoMongoDb();


   const getAllCarts =async() => {

      try {
        return  await CartDAO.getAll();
      } catch (err) {
        console.log(err)

      }

   }

   const getCartById = async (id) => {
       
    try {
      console.log("id",id);
       return await CartDAO.getById(id);
    } catch (err) {
      console.log(err)

    }


       
   }

   const createCart =async(newCart)=> {

    try {
      let cart = {
        timestamp: new Date().toISOString(),
        ...newCart,
        
    }
    await CartDAO.save(cart);
    return cart;
    } catch (err) {
      console.log(err)

    }

   }

   const addProducts = async(id,newProducts) => {

      try {

        await CartDAO.updateById(id,newProducts);
        return newProducts;
      } catch (err) {
        console.log(err)
      }
   }

    const deleteCart = async(id) => {

      try {
        console.log("id",id);
        return CartDAO.deleteById(id);
      } catch (err) {
        console.log(err)
      }

    
   }

   /*const deleteProduct = async (idCart,idProduct) => {
      try {
        return  this.databaseCart.findOneAndUpdate({_id:idCart},{$pull:{"productos":{_id:idProduct}}});

      } catch (err){
        console.log(err)
      }
   }*/

   const getCart = async(id_user) => {

    try {
      const owner = id_user
      return await CartDAO.getByIdPopulate(owner,"productos","item")
    } catch (err) {
      console.log(err)

    }

   }

   const addProduct = async(quantity,id_prod,id_user) => {
     
     const owner = id_user;

      const cart = await CartDAO.getByIdPopulate(owner,"productos","item")
        
            
      const user = await UserDAO.getById(owner);
  
      const foundProduct = await ProductDAO.getById(id_prod);

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

   const updateProductQuantity = async (value, id_prod, id_user) =>  {
    const owner = id_user;
  
  
    try {
      const product = await ProductDAO.getById(id_prod);
  
      const cart = await CartDAO.getByIdPopulate(owner,"productos","item")
  
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

  const removeProduct = async(id_prod,id_user) => {
    
    const owner = id_user

    try {
        const cart = await CartDAO.getByIdPopulate(owner,"productos","item")
    
        const product = await ProductDAO.getById(id_prod);
    
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

  const emptyCart = async (id_user) => {
    const owner = id_user;

    try {
        const cart = await CartDAO.getByCriteria({ owner });

        cart.productos = [];
        cart.subTotal = 0;
        cart.totalQty = 0;

        const savedCart = await cart.save();

        return savedCart

    } catch (err) {
      console.log(err)

    
    };
    
    }


export   {
  getAllCarts,
  getCartById,
  createCart,
  addProducts,
  deleteCart,
  getCart,
  addProduct,
  updateProductQuantity,
  removeProduct,
  emptyCart
}





















