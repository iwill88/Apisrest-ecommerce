import { Cart } from '../models/cartSchema.js';
import { Product } from '../models/productSchema.js';
import { User } from '../models/userSchema.js';
import { Order } from '../models/orderSchema.js';
import { sendOrderMailer } from '../helpers/sendOrderMailer.js';
import { orderSMS } from '../helpers/orderSMS.js';
import { orderWhatsapp } from '../helpers/orderWhatsapp.js';
import { loggerError } from "../loggers/loggers.js";
import CartDaoMongoDb from '../daos/CartMongoDao.js';
import ProductDaoMongoDb from '../daos/ProductMongoDao.js';
import UserDaoMongoDb from '../daos/UserMongoDao.js';
import OrderDaoMongoDb from '../daos/OrderMongoDao.js';

let CartDAO = new CartDaoMongoDb();
let UserDAO = new UserDaoMongoDb();
let OrderDAO = new OrderDaoMongoDb()



    const findOrderById = async(id) => {

        try {
            console.log("id",id);
            return await OrderDAO.getById(id);
        } catch (err) {
            console.log(err)
        }
  
    }

    const createOrder = async(id_user) => {

        try {

            const owner = id_user;

            let productosOrder = []
    
            const user = await UserDAO.getByCriteria(owner)
    
            const cart = await CartDAO.getByIdPopulate(owner,"productos","item")
    
                cart.productos.forEach((item) => {
                    productosOrder.push(item)
                })
                
        
            const newOrder = await new Order({
                timestamp: new Date().toISOString(),
                productos: productosOrder,
                subTotal: cart.subTotal,
                totalQty: cart.totalQty,
                orderBy: user
    
            });
    
 
            
            const savedOrder = await newOrder.save();
              
            user.orders = savedOrder._id;
           

            sendOrderMailer(savedOrder,user)
            orderSMS(user.phone)
            orderWhatsapp(user.name, user.email)
    
            return await user.save();   

        } catch (err) {
           console.log(err)

        }


       

    }


export {
    findOrderById,
    createOrder
}
