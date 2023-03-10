import { Cart } from '../models/cartSchema.js';
import { Product } from '../models/productSchema.js';
import { User } from '../models/userSchema.js';
import { Order } from '../models/orderSchema.js';
import { sendOrderMailer } from '../helpers/sendOrderMailer.js';
import { orderSMS } from '../helpers/orderSMS.js';
import { orderWhatsapp } from '../helpers/orderWhatsapp.js';
import { loggerError } from "../loggers/loggers.js";
import { CartDAO, OrderDAO, UserDAO } from '../daos/index.js';


export default class OrderService{
    constructor(){
        this.CartDao = CartDAO,
        this.OrdertDao = OrderDAO,
        this.UserDao = UserDAO
    }

    async findOrderById(id) {

        try {
            console.log("id",id);
            return await this.OrdertDao.getById(id);
        } catch (err) {
            console.log(err)
        }
    }

    async createOrder(id_user) {

        try {

            const owner = id_user;

            let productosOrder = []
    
            const user = await this.UserDao.getByCriteria(owner)
    
            const cart = await this.CartDao.getByIdPopulate(owner,"productos","item")
    
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

}

    
