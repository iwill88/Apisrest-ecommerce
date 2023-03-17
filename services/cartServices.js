import { Cart } from '../models/cartSchema.js';
import { loggerError } from "../loggers/loggers.js";
import { CartDAO, ProductDAO, UserDAO } from '../daos/index.js';

export default class CartService{
  constructor(){
    this.CartDao = CartDAO,
    this.ProductDao = ProductDAO,
    this.UserDao = UserDAO
  }

  async getAllCarts()  {

    try {
      const carts = await this.CartDao.getAll();
      if(!carts){
        loggerError.error(`No se encontraron los carritos`);
        throw new Error(`No se encontraron los carritos`);
      }
      return  carts
    } catch (err) {
      loggerError.error(`Se produjo un error al buscar a todos los carritos: ${err}`);
      throw err;
    }
 }

  async getCartById(id) {
     
  try {
    const cart = await this.CartDao.getById(id);
    if(!cart){
      loggerError.error(`No se encontró el carrito con ID ${id}`);
      throw new Error(`No se encontró el carrito con ID ${id}`);
    }
    return cart
  } catch (err) {
    loggerError.error(`Se produjo un error al buscar el carrito con ID ${id}: ${err}`);
    throw err;
  }
 }

 async createCart(newCart) {

  try {
    let cart = {
      timestamp: new Date().toISOString(),
      ...newCart,
    }
    const result =  await this.CartDao.save(cart);
    if(!result){
      loggerError.error(`No se creo el nuevo carrito`);
      throw new Error(`No se creo el nuevo carrito`);
    }
    return result;
  } catch (err) {
    loggerError.error(`Se produjo un error al crear un nuevo carrito: ${err}`);
    throw err;
  }
 }

 async addProducts(id,newProducts) {

    try {
      const updatedProduct =  await this.CartDao.updateById(id,newProducts);
      if(!updatedProduct){
        loggerError.error(`No se agrego nuevos productos al carrito con el ID ${id}`);
        throw new Error(`No se agrego nuevos productos al carrito con el ID ${id}`);
      }
      return await this.CartDao.getById(id)
    } catch (err) {
      loggerError.error(`Se produjo un error al intentar agregar nuevos productos al carrito con ID ${id}: ${err}`);
      throw err;
    }
 }

  async deleteCart(id) {

    try {
      const result = await this.CartDao.deleteById(id);
      if(!result){
        loggerError.error(`No se eliminó el carrito con el ID ${id}`);
        throw new Error(`No se eliminó el carrito con el ID ${id}`);
      }
      return 
    } catch (err) {
      loggerError.error(`Se produjo un error al intentar eliminar el carrito con ID ${id}: ${err}`);
      throw err;
    }
 }

 /*const deleteProduct = async (idCart,idProduct) => {
    try {
      return  this.databaseCart.findOneAndUpdate({_id:idCart},{$pull:{"productos":{_id:idProduct}}});

    } catch (err){
      console.log(err)
    }
 }*/

 async getCart (id_user) {

  try {
    const owner = id_user
    const cart = await this.CartDao.getByIdPopulate(owner,"productos","item")
    if(!owner||!cart){
      loggerError.error(`No se encontró el carrito del usuario con ID ${owner}`);
      throw new Error(`No se encontró el carrito del usuario con ID ${owner}`);
    }
    return cart
  } catch (err) {
    loggerError.error(`Se produjo un error al intentar buscar el carrito del usuario con ID ${owner}: ${err}`);
    throw err;
  }
 }

 async addProduct(quantity,id_prod,id_user) {
   
   try {

    const owner = id_user;
    const cart = await this.CartDao.getByIdPopulate(owner,"productos","item")
    const user = await this.UserDao.getById(owner);
    const foundProduct = await this.ProductDao.getById(id_prod);

    if(!owner||!user||!foundProduct){
      loggerError.error(`No se tienen los datos requeridos`);
      throw new Error(`No se tienen los datos requeridos`);
    }

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

   } catch {
    loggerError.error(`Se produjo un error al intentar agregar un nuevo producto al carrito del usuario con ID ${id_user}: ${err}`);
    throw err;
   }

    
 }

 async updateProductQuantity(value, id_prod, id_user) {
  
  try {

    const owner = id_user;

    console.log("user",id_user)

    const product = await this.ProductDao.getById(id_prod);
    
    console.log("producto",id_prod)

    const cart = await this.CartDao.getByIdPopulate(owner,"productos","item")

    if (!owner||!product||!cart){
      loggerError.error(`No se tienen los datos requeridos`);
      throw new Error(`No se tienen los datos requeridos`);
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

  } catch (err) {
    loggerError.error(`Se produjo un error al intentar modificar la cantidad del producto con ID ${id_prod}: ${err}`);
    throw err;
  }

}

async removeProduct(id_prod,id_user) {
  
  try {

      const owner = id_user

      const cart = await this.CartDao.getByIdPopulate(owner,"productos","item")
  
      const product = await this.ProductDao.getById(id_prod);
  
      if (!owner||!product||!cart){
        loggerError.error(`No se tienen los datos requeridos`);
        throw new Error(`No se tienen los datos requeridos`);
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
      loggerError.error(`Se produjo un error al intentar eliminar el producto con ID ${id_prod}: ${err}`);
      throw err;
    }

}

async emptyCart (id_user) {
 
  try {
      const owner = id_user;
      const cart = await this.CartDao.getByCriteria({ owner });

      if (!owner||!cart){
        loggerError.error(`No se tienen los datos requeridos`);
        throw new Error(`No se tienen los datos requeridos`);
      }

      cart.productos = [];
      cart.subTotal = 0;
      cart.totalQty = 0;

      const savedCart = await cart.save();

      return savedCart

  } catch (err) {
    loggerError.error(`Se produjo un error al intentar vaciar el carrito del usuario con ID ${id_user}: ${err}`);
    throw err;
  };
  
  }

}

   






















